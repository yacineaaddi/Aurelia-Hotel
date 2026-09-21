import { getCabin } from "../../services/apiCabins";
import useCreateBooking from "./useCreateBooking";
import useSettings from "../settings/useSettings";
import useGuests from "../guests/useGuests";
import useCabins from "../cabins/useCabins";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useEffect } from "react";
import Form from "../../ui/Form";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { settings } = useSettings();
  const { cabins } = useCabins();
  const { guests } = useGuests();

  const { breakfastPrice, maxBookingLength, minBookingLength } = settings || {};

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const nationalIDs = guests?.map((obj) => obj.nationalID);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const cabinName = watch("cabinName");
  const numNights = watch("numNights");
  const numGuests = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const NationalId = watch("NationalID", "");

  useEffect(() => {
    if (!startDate || !endDate) return;

    const difference =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    if (difference >= minBookingLength && difference <= maxBookingLength) {
      clearErrors("numNights");
      setValue("numNights", difference);
    } else {
      setError("numNights", {
        type: "custom",
        message: `Num nights must be between ${minBookingLength} and ${maxBookingLength} nights`,
      });
    }
  }, [
    minBookingLength,
    maxBookingLength,
    clearErrors,
    startDate,
    endDate,
    setValue,
    setError,
  ]);

  useEffect(() => {
    async function calculatePrices() {
      if (!cabinName) return;

      const cabin = await getCabin(cabinName);

      if (numGuests > cabin.maxCapacity) {
        setError("numGuests", {
          type: "custom",
          message: `Number of guests must be equal to or less than ${cabin.maxCapacity}`,
        });
      } else {
        clearErrors("numGuests");
      }

      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

      const extrasPrice = hasBreakfast
        ? numNights * breakfastPrice * numGuests
        : 0;

      const totalPrice = cabinPrice + extrasPrice || cabinPrice;

      setValue("cabinPrice", cabinPrice);
      setValue("extrasPrice", extrasPrice);
      setValue("totalPrice", totalPrice);
    }

    calculatePrices();
  }, [
    cabinName,
    numNights,
    numGuests,
    hasBreakfast,
    breakfastPrice,
    setValue,
    setError,
    clearErrors,
  ]);

  const newGuestForm =
    NationalId?.toString().trim() !== "" &&
    nationalIDs.some((value) => value === NationalId);

  function onSubmit(data) {
    const {
      cabinPrice,
      extrasPrice,
      totalPrice,
      email,
      fullName,
      nationality,
      ...bookingData
    } = data;

    if (isEditSession)
      createBooking(
        { newCabinData: { ...bookingData }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createBooking(
        { ...bookingData },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  function onError(error) {
    console.error(error);
  }

  if (!settings || !cabins) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="text"
          id="numGuests"
          defaultValue={1}
          {...register("numGuests", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="National ID"
        error={errors?.NationalID?.message}
        alert={newGuestForm && `User is already registred`}
      >
        <Input
          type="text"
          id="NationalID"
          {...register("NationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>
      {!newGuestForm && (
        <>
          <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FormRow>
          <FormRow label="Nationality" error={errors?.nationality?.message}>
            <Input
              type="number"
              id="nationality"
              {...register("nationality", {
                required: "This field is required",
              })}
            />
          </FormRow>
        </>
      )}
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
            validate: (value) => {
              const selectedDate = new Date(`${value}T00:00:00`);

              const today = new Date();
              today.setHours(0, 0, 0, 0);
              today.setDate(today.getDate());

              return (
                selectedDate >= today || "Start Day must be at least today"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              const selectedDate = new Date(`${value}T00:00:00`);

              const tomorrow = new Date();
              tomorrow.setHours(0, 0, 0, 0);
              tomorrow.setDate(tomorrow.getDate() + minBookingLength);

              return (
                selectedDate >= tomorrow || "End date must be at least tomorrow"
              );
            },
          })}
        />
      </FormRow>
      <FormRow label="Num nights" error={errors?.numNights?.message}>
        <Input
          id="numNights"
          type="number"
          disabled={true}
          {...register("numNights")}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <select id="status" {...register("status")}>
          <option value="unconfirmed">Unconfirmed</option>
          <option value="checked in">Checked in</option>
          <option value="checked out">Checked out</option>
        </select>
      </FormRow>

      <FormRow label="Include breakfast" error={errors?.hasBreakfast?.message}>
        <select
          id="hasbreakfast"
          {...register("hasBreakfast", {
            setValueAs: (value) => value === "true",
          })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormRow>

      <FormRow label="Is paid" error={errors?.isPaid?.message}>
        <select
          id="isPaid"
          {...register("isPaid", {
            setValueAs: (value) => value === "true",
          })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormRow>

      <FormRow label="Select room" error={errors?.cabinName?.message}>
        <select id="cabinName" {...register("cabinName")}>
          {cabins.map((cabin) => (
            <option value={cabin.name}>{cabin.name}</option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="CabinPrice"
          disabled={true}
          {...register("cabinPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          disabled={true}
          {...register("extrasPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Total price" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          disabled={true}
          {...register("totalPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea type="text" id="observation" {...register("observations")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit booking" : "Create new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

import { getCabin } from "../../services/apiCabins";
import useEditCabin from "../cabins/useEditCabin";
import useCreateBooking from "./useCreateBooking";
import useSettings from "../settings/useSettings";
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
  const { isLoading, error, settings } = useSettings();
  const { isCreating, createBooking } = useCreateBooking();
  const { isLoadingCabins, cabins } = useCabins();
  const { editCabin, isEditing } = useEditCabin();

  const { breakfastPrice, maxBookingLength, minBookingLength } = settings || {};

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = bookingToEdit;

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const { cabinPrice, extrasPrice, totalPrice, ...bookingData } = data;

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

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const cabinId = watch("cabinId");
  const numNights = watch("numNights");
  const numGuests = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");

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
      if (!cabinId) return;

      const cabin = await getCabin(cabinId);

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
    cabinId,
    numNights,
    numGuests,
    hasBreakfast,
    breakfastPrice,
    setValue,
    setError,
    clearErrors,
  ]);

  if (!settings || !cabins) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          defaultValue={1}
          {...register("numGuests", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
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
          disabled={isWorking}
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

      <FormRow label="Select room" error={errors?.cabinId?.message}>
        <select
          id="cabinId"
          {...register("cabinId", {
            valueAsNumber: true,
          })}
        >
          {cabins.map((cabin) => (
            <option value={cabin.id}>{cabin.name}</option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="CabinPrice"
          disabled={true}
          {...register("cabinPrice", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="CabinPrice"
          disabled={true}
          {...register("extrasPrice", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Total price" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="CabinPrice"
          disabled={true}
          {...register("totalPrice", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="text"
          id="observation"
          defaultValue=""
          disabled={isWorking}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit booking" : "Create new booking"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

// Under dev

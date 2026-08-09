import { useForm } from "react-hook-form";
import { useEffect } from "react";

import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import useCreateBooking from "./useCreateBooking";
import useSettings from "../settings/useSettings";
import useCabins from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
//import useEditCabin from "./useEditCabin";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isLoading, error, settings } = useSettings();
  const { isCreating, createBooking } = useCreateBooking();
  const { isLoadingCabins, cabins } = useCabins();

  //const { editCabin, isEditing } = useEditCabin();
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestPerBooking,
    minBookingLength,
  } = settings || {};

  console.log(settings);
  //const isWorking = isCreating || isEditing;

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
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {}

  function onError(error) {
    console.log(error);
  }

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (!startDate || !endDate) return;

    const difference =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    setValue("numNights", difference);
  }, [startDate, endDate, setValue]);

  if (!settings || !cabins) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          //disabled={isWorking}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          //disabled={isWorking}
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Num nights" error={errors?.numNights?.message}>
        <Input
          id="numNights"
          type="number"
          disabled={true}
          {...register("numNights", {
            validate: () => {
              const startDate = getValues("startDate");
              const endDate = getValues("endDate");
              if (!startDate || !endDate) return true;

              const difference =
                (new Date(endDate) - new Date(startDate)) /
                (1000 * 60 * 60 * 24);

              return (
                (difference >= minBookingLength &&
                  difference <= maxBookingLength) ||
                `Num nights must be between ${minBookingLength} and ${maxBookingLength} nights`
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <select id="status" {...register("status")}>
          <option value="unconfirmed">Unconfirmed</option>
          <option value="checked in">Checked in</option>
          <option value="checked out">Checked out</option>
        </select>
      </FormRow>

      <FormRow label="Include breakfast" error={errors?.hasbreakfast?.message}>
        <select id="hasbreakfast" {...register("hasbreakfast")}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormRow>

      <FormRow label="Is paid" error={errors?.isPaid?.message}>
        <select id="isPaid" {...register("isPaid")}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </FormRow>

      <FormRow label="Select room" error={errors?.isPaid?.message}>
        <select id="cabinId" {...register("cabinId")}>
          {cabins.map((cabin) => (
            <option value={cabin.id}>{cabin.name}</option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          defaultValue={1}
          {...register("numGuests", {
            required: "This field is required",
            validate: (numGuests) => {
              return (
                numGuests <= maxGuestPerBooking ||
                `Number of guests must be equal or less than ${maxGuestPerBooking}`
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin price" error={errors?.CabinPrice?.message}>
        <Input
          type="number"
          id="CabinPrice"
          disabled={true}
          value={5}
          {...register("CabinPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="observation"
          defaultValue=""
          //disabled={isWorking}
          {...register("observation")}
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
        <Button>{isEditSession ? "Edit room" : "Create new room"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

// Under dev

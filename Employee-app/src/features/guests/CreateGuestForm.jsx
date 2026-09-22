import { useForm } from "react-hook-form";
import useEditGuest from "./useEditGuest";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { editGuestFn, isEditing } = useEditGuest();

  const { id: editId, ...editValues } = guestToEdit;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editValues,
  });

  const { errors } = formState;

  function onSubmit(data) {
    editGuestFn(
      { editedGuest: data, editId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  function onError(error) {
    console.error(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="E-mail" error={errors?.email?.message}>
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
          type="text"
          id="nationality"
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="NationalID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          disabled={true}
          id="nationalID"
          {...register("nationalID", { required: "This field is required" })}
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
        <Button disabled={isEditing}>{"Edit guest"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;

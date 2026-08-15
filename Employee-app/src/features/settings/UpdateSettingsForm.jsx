import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import useUpdateSetting from "../settings/useUpdateSetting";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = settings;

  function handleUpdate(e, field) {
    const value = Number(e.target.value);
    const currentValue = Number(settings[field]);

    if (!e.target.value || value === currentValue) return;

    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => {
            handleUpdate(e, "minBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

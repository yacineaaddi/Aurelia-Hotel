import { getCountries } from "@/app/_lib/data-service";
import CountrySelectClient from "./CountrySelectClient";

async function SelectCountry({
  name,
  id,
  className,
  defaultCountry,
  onChange,
}) {
  const countries = await getCountries();

  return (
    <CountrySelectClient
      name={name}
      id={id}
      className={className}
      onChange={onChange}
      defaultCountry={defaultCountry}
      options={countries.map((c) => ({
        name: c.names.common,
        value: `${c.names.common}%${c.flag.emoji}`,
      }))}
    />
  );
}

export default SelectCountry;

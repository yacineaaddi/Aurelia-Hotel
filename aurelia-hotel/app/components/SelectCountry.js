import { getCountries } from "@/app/_lib/data-service";

async function SelectCountry({ name, id, className }) {
  const countries = await getCountries();

  return (
    <select name={name} id={id} className={className}>
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option
          key={c.names.common}
          value={`${c.names.common}%${c.flag.emoji}`}
        >
          <span className="flex justify-between">{c.names.common}</span>
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;

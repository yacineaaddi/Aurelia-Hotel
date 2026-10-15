"use client";

export default function CountrySelectClient({
  name,
  id,
  className,
  defaultCountry,
  onChange,
  options,
}) {
  return (
    <select
      name={name}
      id={id}
      className={className}
      defaultValue={defaultCountry ?? ""}
      onChange={onChange}
    >
      <option value={defaultCountry ? defaultCountry : ""}>
        {defaultCountry ? defaultCountry : "Select country..."}
      </option>
      {options.map((country) => (
        <option key={country.name} value={country.value}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

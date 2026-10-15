import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import SelectCountry from "@/app/components/SelectCountry";
import UpdateProfileForm from "@/app/components/UpdateProfileForm";
import { getCountries } from "@/app/_lib/data-service";

export const metadata = { title: "Update profile" };

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);
  const countries = await getCountries();

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm
        guest={guest}
        countries={countries.map((c) => ({
          name: c.names.common,
          value: `${c.names.common}%${c.flag.emoji}`,
        }))}
      />
    </div>
  );
}

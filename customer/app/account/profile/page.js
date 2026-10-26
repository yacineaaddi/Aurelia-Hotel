import UpdateProfileForm from "@/app/components/UpdateProfileForm";
import { getCountries } from "@/app/_lib/data-service";
import { getGuest } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";

export const metadata = { title: "Aurelia Hotel | Profile" };

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);
  console.log("session", session);
  console.log("guest", guest);
  const countries = await getCountries();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-2xl text-accent-400 self-center">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200 self-center">
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

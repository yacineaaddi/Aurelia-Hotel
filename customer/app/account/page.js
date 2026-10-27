import { auth } from "../_lib/auth";

export const metadata = { title: "Aurelia Hotel | Account" };

export default async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);

  return (
    <div className="font-normal text-2xl text-accent-400 text-center">
      <p>Welcome, {firstName}</p>
      <br />
      <p>
        Here, you can easily explore your reservations, keep track of your
        upcoming stays, and update your profile information whenever you need.
        Everything you need to manage your bookings and keep your details up to
        date is just a few clicks away
      </p>
    </div>
  );
}

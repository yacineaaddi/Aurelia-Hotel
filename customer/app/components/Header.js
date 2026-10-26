import Navigation from "./Navigation";
import { auth } from "../_lib/auth";
import Logo from "./Logo";

export default async function Header() {
  const session = await auth();

  return (
    <>
      <header className="py-3 md:py-5 sticky top-0 z-10 bg-black bg-opacity-5 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center max-w-[90%] mx-auto">
          <Logo />
          <Navigation session={session} />
        </div>
      </header>
    </>
  );
}

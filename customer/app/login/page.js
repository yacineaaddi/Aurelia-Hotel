import SignInButton from "../components/SignInButton";
import Image from "next/image";

export const metadata = { title: "login" };

export default function Page() {
  return (
    <div className="w-10/12 mx-auto flex flex-col gap-10 my-20 items-center">
      <Image
        src="/logo-light.png"
        height="240"
        width="240"
        alt="Aurelia Hotel"
      />
      <h2 className="text-2xl font-semibold text-center">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}

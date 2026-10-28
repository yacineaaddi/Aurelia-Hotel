import SignInButton from "../components/SignInButton";
import Image from "next/image";

export const metadata = { title: "login" };

export default function Page() {
  return (
    <div className="loginpage">
      <Image
        src="/logo-light.png"
        height="240"
        width="240"
        alt="Aurelia Hotel"
      />
      <h2 className="loginpage-header">Sign in to access your guest area</h2>
      <SignInButton />
    </div>
  );
}

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/action";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button>
        <ArrowRightOnRectangleIcon className="signOutButton" />
      </button>
    </form>
  );
}

export default SignOutButton;

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/action";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button>
        <ArrowRightOnRectangleIcon className="h-7 w-7 text-accent-400 transition-colors" />
      </button>
    </form>
  );
}

export default SignOutButton;

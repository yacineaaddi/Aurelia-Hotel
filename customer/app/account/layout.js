import SideNavigation from "../components/SideNavigation";
import { auth } from "@/app/_lib/auth";

export default async function Layout({ children }) {
  const session = await auth();
  const nationalID = session.user.nationalID;

  return (
    <>
      {!nationalID && (
        <div className="mx-auto text-center bg-red-500 py-2 mb-6 text-base">
          Please update your National ID
        </div>
      )}
      <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
        <SideNavigation />

        <div className="flex-1 px-8 py-1">{children}</div>
      </div>
    </>
  );
}

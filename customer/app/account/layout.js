import SideNavigation from "../components/SideNavigation";
import DiscoverMore from "../components/DiscoverMore";
import { auth } from "@/app/_lib/auth";

export default async function Layout({ children }) {
  const session = await auth();
  const nationalID = session.user.nationalID;

  return (
    <>
      <div className="w-12/12 md:w-10/12 mx-auto my-14">
        {!nationalID && (
          <div className="mx-auto text-center bg-red-500 py-2 mb-6 text-base">
            Please update your National ID
          </div>
        )}
        <div className="flex flex-col h-full gap-14">
          <SideNavigation />

          <div className="w-[100%] xl:w-[90%] px-8 py-1 self-center">
            {children}
          </div>
        </div>
      </div>
      <DiscoverMore />
    </>
  );
}

import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />

      <div className="flex-1 px-8 py-12">{children}</div>
    </div>
  );
}

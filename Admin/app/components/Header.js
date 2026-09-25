import Navigation from "./Navigation";
import Logo from "./Logo";

function Header() {
  return (
    <header className="border-b border-primary-900 px-0 py-5">
      <div className="flex justify-between items-center max-w-[85%] mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

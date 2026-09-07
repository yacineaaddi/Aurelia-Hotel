import Image from "next/image";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-4 z-10">
      <Image src="/logo-dark.png" height="90" width="90" alt="Aurelia Hotel" />
    </a>
  );
}

export default Logo;

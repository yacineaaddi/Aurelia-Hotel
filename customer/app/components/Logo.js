import Image from "next/image";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-4">
      <Image src="/logo-light.png" height="80" width="80" alt="Aurelia Hotel" />
    </a>
  );
}

export default Logo;

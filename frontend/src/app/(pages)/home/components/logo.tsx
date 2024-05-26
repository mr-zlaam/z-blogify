import Image from "next/image";
import {} from "react";

function Logo() {
  return (
    <div className="h-[300px] w-[300px] bg-red-500 overflow-hidden rounded-full mx-auto">
      <Image
        src={"/logo/logo.jpeg"}
        height={500}
        width={500}
        alt="Logo"
        className="rounded-full"
      />
    </div>
  );
}

export default Logo;

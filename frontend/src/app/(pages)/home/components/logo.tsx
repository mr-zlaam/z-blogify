import Image from "next/image";
import {} from "react";

function Logo() {
  return (
    <div className="h-[300px] w-[300px] bg-foreground/70 flex justify-center items-center overflow-hidden rounded-full mx-auto my-5 shadow">
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

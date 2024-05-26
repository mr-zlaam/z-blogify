import Image from "next/image";
import {} from "react";

function Logo() {
  return (
    <div className=" w-fit bg-foreground/70 flex justify-center items-center overflow-hidden rounded-full mx-auto my-5 shadow">
      <Image
        src={"/logo/logo.jpeg"}
        height={300}
        width={300}
        alt="Logo"
        className="rounded-full"
      />
    </div>
  );
}

export default Logo;

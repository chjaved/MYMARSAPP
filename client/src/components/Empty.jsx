import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="border-black border-l w-full bg-white flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center">
      <Image src="/Logo-PNG.png" alt="Logo-PNG.png" height={300} width={300} />
    </div>
  );
}

export default Empty;

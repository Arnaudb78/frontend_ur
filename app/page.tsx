import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <h2 className="text-white text center font-bold text-[50px]">B3DEV be faster.</h2>
      <Image src="/getout.png" alt="logo" width="1000" height="100" />
    </div>
    </>
  );
}

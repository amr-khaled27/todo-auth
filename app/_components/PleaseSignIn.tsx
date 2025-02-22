import Link from "next/link";

const PleaseSignIn = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10"></div>

      <div className="fixed w-[300px] top-1/2 left-1/2 transform space-y-4 -translate-x-1/2 text-[#010104] -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-20">
        <p className="capitalize text-center text-xl">
          you are not authenticated
        </p>
        <Link
          href="/"
          className="text-lg block text-center capitalize bg-[#010104] text-white p-4 w-full rounded-lg"
        >
          back to landing
        </Link>
      </div>
    </div>
  );
};

export default PleaseSignIn;

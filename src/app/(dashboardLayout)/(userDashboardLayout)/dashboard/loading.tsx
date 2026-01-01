import { Plane } from "lucide-react";

const UserLoading = () => {
  return (
    // <div className="text-xl font-semibold italic text-center xl:my-60 lg:my-36 md:my-28 my-20">
    //   Loading ...
    // </div>

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 shadow-lg">
          <Plane
            className="h-12 w-12 text-primary animate-spin-slow drop-shadow-lg"
            strokeWidth={2.5}
          />
        </div>

        <p className="mt-4 text-primary font-semibold tracking-wide animate-pulse">
          Preparing your travel experience…
        </p>
      </div>
    </div>
  );
};

export default UserLoading;

import { LoaderCircle } from "lucide-react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoaderCircle className="size-16 animate-spin text-primary" />
    </div>
  );
};

export default LoadingScreen;

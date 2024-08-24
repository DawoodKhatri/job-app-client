import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-72px)] flex flex-col justify-center items-center gap-8 p-8">
      <img className="w-2/3 max-w-[520px]" src="/not-found.svg" />
      <p className="text-4xl font-bold text-[#3F3D56]">Page not found</p>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;

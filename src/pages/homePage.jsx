import { NotepadText } from "lucide-react";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-72px)] max-w-screen-xl mx-auto flex flex-col justify-center items-center gap-4 p-8">
      <h1 className="font-bold text-4xl md:text-5xl text-primary flex gap-2 justify-center items-center">
        <NotepadText className="size-8 md:size-10" />
        Job Find
      </h1>
      <h2 className="font-semibold text-center text-2xl md:text-4xl">
        Find Your Next Opportunity Today
      </h2>
      <img className="w-2/3 max-w-[480px] mx-auto my-10" src="/home.svg" />
      <h3 className="text-center text-xl md:text-3xl text-muted-foreground">
        Connecting Talented Individuals with Leading Companies
      </h3>
    </div>
  );
};

export default HomePage;

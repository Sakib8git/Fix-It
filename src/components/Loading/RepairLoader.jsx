import { Settings } from "lucide-react";

export const RepairLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90">
      <div className="relative">
        {/* বাইরের গিয়ার */}
        <Settings className="h-16 w-16 animate-spin text-primary duration-[3000ms]" />
        
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground animate-pulse">
        Fixing things up...
      </h2>
    </div>
  );
};

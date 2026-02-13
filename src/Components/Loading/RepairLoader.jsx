import { Settings, Wrench } from "lucide-react";

export const RepairLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90">
      <div className="relative">
        {/* বাইরের গিয়ার */}
        <Settings className="h-16 w-16 animate-spin text-primary duration-[3000ms]" />
        {/* মাঝখানের রেঞ্চ */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Wrench className="h-6 w-6 text-foreground" />
        </div>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground animate-pulse">
        Fixing things up...
      </h2>
    </div>
  );
};

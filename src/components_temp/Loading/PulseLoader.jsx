export const PulseLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-primary animate-ping opacity-75"></div>
        <p className="mt-4 font-mono text-primary font-bold">
          FIXIT LOADING...
        </p>
      </div>
    </div>
  );
};

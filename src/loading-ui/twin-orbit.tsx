import { cn } from "./utils";

function TwinOrbit({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-twin-orbit-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <span
        role="status"
        className={cn(
          "relative inline-block aspect-square overflow-hidden rounded-full bg-transparent",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute inset-[18%] rounded-full bg-current opacity-35"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-center"
          style={{
            animation: "loading-ui-twin-orbit-spin var(--duration, 1s) linear infinite",
          }}
        >
          <span className="absolute top-[6%] left-1/2 h-[26%] w-[26%] -translate-x-1/2 rounded-full bg-current" />
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-center"
          style={{
            animation: "loading-ui-twin-orbit-spin var(--duration, 1s) linear infinite",
            animationDelay: "calc(var(--duration, 1s) / -2)",
          }}
        >
          <span className="absolute top-[6%] left-1/2 h-[26%] w-[26%] -translate-x-1/2 rounded-full bg-current" />
        </span>
        <span className="sr-only">Loading</span>
      </span>
    </>
  );
}

export { TwinOrbit };

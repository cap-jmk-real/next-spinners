import { cn } from "./utils";

function TripleDotSpinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-triple-dot-rotation {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <span
        role="status"
        className={cn(
          "relative inline-block aspect-square shrink-0 overflow-hidden rounded-full",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-center"
          style={{
            animation:
              "loading-ui-triple-dot-rotation var(--duration, 2s) ease-in-out infinite",
          }}
        >
          <span className="absolute top-[8%] left-1/2 h-[23%] w-[23%] -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute inset-0 rotate-[120deg]">
            <span className="absolute top-[8%] left-1/2 h-[23%] w-[23%] -translate-x-1/2 rounded-full bg-current" />
          </span>
          <span className="absolute inset-0 rotate-[240deg]">
            <span className="absolute top-[8%] left-1/2 h-[23%] w-[23%] -translate-x-1/2 rounded-full bg-current" />
          </span>
        </span>
        <span className="sr-only">Loading</span>
      </span>
    </>
  );
}

export { TripleDotSpinner };

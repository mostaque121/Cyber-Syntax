"use client";

export function LoadingDots() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center gap-1">
        <div
          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}

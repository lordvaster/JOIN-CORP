export function AuroraBackground() {
  return (
    <div className="bg-aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-join-float absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[oklch(0.55_0.2_255/40%)] blur-3xl" />
      <div
        className="animate-join-float absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.55_0.24_300/35%)] blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="animate-join-float absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[oklch(0.55_0.18_210/25%)] blur-3xl"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}

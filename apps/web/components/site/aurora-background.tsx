export function AuroraBackground() {
  return (
    <div className="bg-aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-join-float absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[var(--aurora-blob-1)] blur-3xl" />
      <div
        className="animate-join-float absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[var(--aurora-blob-2)] blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="animate-join-float absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[var(--aurora-blob-3)] blur-3xl"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}

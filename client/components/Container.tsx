export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6">
      {children}
    </div>
  );
}

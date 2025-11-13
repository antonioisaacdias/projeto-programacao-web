export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-muted border border-border rounded-lg p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
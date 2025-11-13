export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'outline' | 'success' | 'danger';
  disabled?: boolean;
}) {
  const variants = {
    primary: 'bg-gradient-to-b from-secondary via-primary to-primary text-white border-none shadow-inner hover:shadow-lg hover:shadow-primary/30',
    outline: 'bg-transparent text-secondary border border-secondary hover:bg-secondary/10 hover:border-primary',
    success: 'bg-success text-white border border-success hover:shadow-lg hover:shadow-success/30',
    danger: 'bg-danger text-white border border-danger hover:shadow-lg hover:shadow-danger/30',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        display inline-flex items-center justify-center
        px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
        ${variants[variant]}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}

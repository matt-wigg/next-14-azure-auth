import LoadingSpinner from "@/app/components/loading-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  children?: React.ReactNode;
  className?: string;
  label: string;
  loading?: boolean;
}

export default function Button({
  onClick,
  type,
  children,
  className,
  label,
  loading,
}: ButtonProps) {
  const content = loading ? <LoadingSpinner /> : children || label;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex justify-center items-center w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      disabled={loading}
      aria-label={label}
    >
      <span className="min-w-60 text-center">{content}</span>
    </button>
  );
}

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  className?: string;
  label: string;
  loading?: boolean;
}

function LoadingSpinner() {
  return (
    <div
      className='h-6 w-6 mx-auto border-2 rounded-full border-y-white border-x-black animate-spin'
      role='status'
      aria-label='Loading spinner'
    />
  );
}

export function Button({
  onClick,
  type = 'button',
  children,
  className = '',
  label,
  loading = false,
  ...rest
}: ButtonProps) {
  const content = loading ? <LoadingSpinner /> : children || label;

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={loading}
      aria-label={label}
      {...rest}
    >
      <span className='min-w-60 text-center'>{content}</span>
    </button>
  );
}

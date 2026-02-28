interface ButtonProps {
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly disabled?: boolean;
  readonly type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#009900] text-white hover:bg-[#006600]',
    secondary: 'bg-[#006600] text-white hover:bg-[#003300]',
    outline: 'border-2 border-[#009900] text-[#009900] hover:bg-[#ccffcc]'
  };

  // Se className tem classes customizadas, não aplica variant
  const hasCustomColors = className.includes('bg-') || className.includes('text-') || className.includes('border-');
  const finalClassName = hasCustomColors 
    ? `${baseStyles} ${className}`
    : `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
    >
      {children}
    </button>
  );
}

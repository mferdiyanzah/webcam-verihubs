interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  onClick?: () => void;
}

export default function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button
      className={`bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

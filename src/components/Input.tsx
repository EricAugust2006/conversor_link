// interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}
interface InputsProps {
  className?: string;
  placeholder: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}
export default function Input({
  className,
  value,
  placeholder,
  onChange,
  required,
  ...props
}: InputsProps) {
  return (
    <input
      required={required}
      {...props}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border px-2 py-1 border-[#C4C4C4] border-blur-md rounded-xs transition-all duration-300 easy-in-out focus:border-gray-800 hover:border-gray-800 active:border-[#001B3D] focus:outline-none w-full active:outline-none focus:outline-none active:scale-95"
      type="text"
    />
  );
}

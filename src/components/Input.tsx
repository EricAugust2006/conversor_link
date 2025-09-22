// interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}
interface InputsProps{
    className?: string;
    placeholder: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean
}
export default function Input({ className, value, placeholder, onChange,required, ...props }: InputsProps) {
  return (
    <input
      required={required}
      {...props}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border px-2 py-1 border-[#001426] rounded-xs transition-all duration-300 easy-in-out focus:border-gray-800  hover:border-[#001B3D] active:border-[#001B3D] focus:outline-none w-full"
      type="text"
    />
  );
}

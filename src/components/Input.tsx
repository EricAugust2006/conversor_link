// interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}
interface InputsProps{
    className?: string;
    placeholder: string;
    
}
export default function Input({ className, placeholder }: InputsProps) {
  return (
    <input
      placeholder={placeholder}
      className="border px-2 py-1 border-[#001426] rounded-xs transition-all duration-300 easy-in-out focus:border-gray-800  hover:border-[#001B3D] active:border-[#001B3D] focus:outline-none w-full"
      type="text"
    />
  );
}

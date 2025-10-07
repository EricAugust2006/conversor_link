import { Link, Slash } from "lucide-react";

interface MensagemProps {
  type: "sucesso" | "erro";
  mensagem: string;
  className?: string;
}

const cores = {
  sucesso: "bg-green-500",
  erro: "bg-red-500",
};

type MensagemType = "sucesso" | "erro" | null;


export function Mensagem({ type, mensagem, className }: MensagemProps) {
  return (
    <div
      className={`absolute z-50 bottom-4 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded text-white flex justify-center items-center ${cores[type]} ${className}`}
    >
      {type === "sucesso" && <Link className="mr-2" />}
      {type === "erro" && <Slash className="mr-2" />}
      <span>{mensagem}</span>
    </div>
  );
}
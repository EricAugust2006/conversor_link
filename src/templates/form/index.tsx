import Input from "@/components/Input";
import { Link, Code, Slash } from "lucide-react";

export default function Form() {
  return (
    <div className="flex flex-col h-screen w-full flex justify-center items-center">
      <div className="flex flex-col border border-[#001426] p-2 gap-4 bg-[#00050A]">
        <section className="">
          <h1 className="inter-font text-[#082040] text-xl font-bold">Conversor de Links</h1>
          <p className="text-sm font-semibold inter-font text-[#323238]">
            Coloque o nome do link e um codigo aleatório para ele
          </p>
        </section>
        <span className="block w-full h-[.5px] bg-[#27272E] "></span>
        <section className="w-full">
          <Input placeholder="Nome do link original" />
          <section className="flex items-center gap-2 mt-4">
            <Input placeholder="Nome do Link" />
            /
            <Input placeholder="Código" />
          </section>
        </section>
      </div>
    </div>
  );
}

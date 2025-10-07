"use client";

import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { Link, Code, Slash } from "lucide-react";
import { Mensagem } from "@/components/mensagem";

interface FormProps {
  linkOriginal: string;
  linkNomeEncurtar: string;
  codeEncurtar: string;
}
type MensagemType = "sucesso" | "erro";

export default function Form() {
  const [formSucessSubmit, setFormSucessSubmit] = useState(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [mensagemTipo, setMensagemTipo] = useState<MensagemType | null>(null);

  const [loading, setLoading] = useState(false);
  const [Success, setSucess] = useState(false);
  const [data, setData] = useState({
    linkOriginal: "",
    linkNomeEncurtar: "",
    codeEncurtar: "",
  } as FormProps);

  useEffect(() => {
    if (mensagemTipo) {
      const timer = setTimeout(() => setMensagemTipo(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagemTipo]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMensagemTipo(null);

    if (
      !data.linkOriginal.startsWith("http://") &&
      !data.linkOriginal.startsWith("https://")
    ) {
      alert("Insira um link válido! (ex: https://example.com)");
      setLoading(false);
      return;
    }

    if (!data.linkOriginal || !data.linkNomeEncurtar || !data.codeEncurtar) {
      alert("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok) {
        setMensagemTipo("erro");
        setMensagem("Erro ao gerar link!");
        return;
      }

      console.log(res);
      console.log(`${res.shortedNameLink}/${res.shortedCode}`);
      setMensagemTipo("sucesso");
      setMensagem(`Link gerado: ${res.shortedNameLink}/${res.shortedCode}`);
      
      setData({ linkOriginal: "", linkNomeEncurtar: "", codeEncurtar: "" });
    } catch (err) {
      console.log("Erro:", err);
      setMensagemTipo("erro");
      setMensagem("Erro ao gerar link!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 gap-4 bg-black/80 text-white rounded-lg shadow-xl backdrop-blur-md border border-[#27272E] max-w-[500px] w-[90%]"
      >
        <section className="">
          <h1 className="inter-font text-[#999999] text-xl font-bold">
            Conversor de Links
          </h1>
          <p className="text-sm font-semibold inter-font text-[#828282]/50">
            Coloque o nome do link e um codigo aleatório para ele
          </p>
        </section>

        <span className="block w-full h-[.5px] bg-[#27272E]" />

        <section className="w-full">
          <Input
            required
            onChange={(e) => setData({ ...data, linkOriginal: e.target.value })}
            value={data.linkOriginal}
            placeholder="Nome do link original"
          />
          <section className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
            <Input
              required
              onChange={(e) =>
                setData({ ...data, linkNomeEncurtar: e.target.value })
              }
              value={data.linkNomeEncurtar}
              placeholder="Nome do Link: ex: link"
            />
            <span className="hidden md:block">/</span>
            <Input
              required
              onChange={(e) =>
                setData({ ...data, codeEncurtar: e.target.value })
              }
              value={data.codeEncurtar}
              placeholder="Código: ex: 123"
            />
          </section>
        </section>

        <button
          disabled={loading}
          type="submit"
          className="border border-[#27272E] bg-[#28282E]  text-[#949494] p-2 rounded-md cursor-pointer transition-all duration-300 easy-in-out hover:bg-[#494952] hover:border-[#494952] hover:scale-105 hover:text-white "
        >
          {loading ? "Gerando link..." : "Gerar link"}
        </button>
      </form>

      {mensagemTipo && <Mensagem type={mensagemTipo} mensagem={mensagem} />}
    </div>
  );
}

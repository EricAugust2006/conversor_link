"use client";

import Input from "@/components/Input";
import { useState } from "react";
import { Link, Code, Slash } from "lucide-react";

interface FormProps {
  linkOriginal: string;
  linkNomeEncurtar: string;
  codeEncurtar: string;
}

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false);
  const [data, setData] = useState({
    linkOriginal: "",
    linkNomeEncurtar: "",
    codeEncurtar: "",
  } as FormProps);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (
      !data.linkOriginal.startsWith("http://") &&
      !data.linkOriginal.startsWith("https://")
    ) {
      alert("Insira um link válido! (ex: https://example.com)");
      return;
    }

    try {
      const formData = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res: FormProps = await formData.json();
      console.log(
        `Link Encurtado:, ${res.linkNomeEncurtar}/${res.codeEncurtar}`
      );
      setSucess(true);
      return res;
    } catch (error) {
      console.log(`Erro ao criar link: ${error}`);
      setSucess(false);
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
    </div>
  );
}

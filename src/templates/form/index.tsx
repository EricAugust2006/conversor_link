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
      return res;
    } catch (error) {
      console.log(`Erro ao criar link: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-[#001426] p-2 gap-4 bg-[#00050A]"
      >
        <section className="">
          <h1 className="inter-font text-[#0E4999] text-xl font-bold">
            Conversor de Links
          </h1>
          <p className="text-sm font-semibold inter-font text-[#323238]">
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
          <section className="flex items-center gap-2 mt-4">
            <Input
              required
              onChange={(e) =>
                setData({ ...data, linkNomeEncurtar: e.target.value })
              }
              value={data.linkNomeEncurtar}
              placeholder="Nome do Link: ex: link"
            />
            /
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
          className="bg-[#082040] text-[#949494] p-2 rounded-md cursor-pointer transition-all duration-300 easy-in-out hover:bg-[#01294D] hover:scale-101 hover:text-white "
        >
          {loading ? "Gerando link..." : "Gerar link"}
        </button>
      </form>
    </div>
  );
}

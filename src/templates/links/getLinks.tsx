"use client";

import { useState, useEffect } from "react";
interface Link {
  id: string;
  original: string;
  shortedNameLink: string;
  shortedCode: string;
}

type GetLinksProps = {
  close: () => void;
};

export const GetLinks: React.FC<GetLinksProps> = ({ close }) => {
  const [link, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function LinksList() {
      try {
        setLoading(true);
        const res = await fetch("/api/url", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res) throw new Error("Erro ao buscar links");

        const data = await res.json();
        console.log("Retornou:", data);

        setLinks(Array.isArray(data.links) ? data.links : []);
      } catch (error) {
        console.error("Erro ao buscar links:", error);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    }
    LinksList();
  }, []);

  return (
    <>
      <div className="bg-gray-800 p-4">
        <section className="flex flex-col gap-4 md:gap-6 max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
            <button onClick={close}>X</button>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            LINKS
          </h1>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
            {loading ? (
              <p className="text-xl text-white">Carregando links...</p>
            ) : link.length === 0 ? (
              <p className="text-xl text-white">Não há links encurtados</p>
            ) : (
              link.map((link) => (
                <div key={link.id} className="p-3 md:p-4 bg-white/10 break-words shadow-md rounded  ">
                  <p className="text-sm md:text-base text-gray-200 mb-1">
                    **Original**: {link.original}
                  </p>
                  <p className="text-white text-base md:text-lg">
                    Encurtado:{" "}
                    {link.original.includes("https://") ? (
                      <a
                        href={link.original}
                        className="text-blue-300 underline hover:text-blue-200 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://{link.shortedNameLink}/{link.shortedCode}
                      </a>
                    ) : (
                      <a
                        href={link.original}
                        className="text-blue-300 underline hover:text-blue-200 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        http://{link.shortedNameLink}/{link.shortedCode}
                      </a>
                    )}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};
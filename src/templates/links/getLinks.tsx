"use client";

import { useState, useEffect } from "react";
interface Link {
  id: string;
  original: string;
  shortedNameLink: string;
  shortedCode: string;
}

export default function GetLinks() {
  const [link, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    async function LinksList() {
      try {
        const res = await fetch("/api/url", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar links");

        const data = await res.json();
        console.log("Retornou:", data);

        setLinks(Array.isArray(data.links) ? data.links : []);
      } catch (error) {
        console.error("Erro ao buscar links:", error);
      }
    }
    LinksList();
  }, []);

  return (
    <>
      <div className="bg-red-500 ">
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Links Encurtados</h1>
          <div className="flex flex-col">
            {link.length === 0 ? (
              <p className="text-2xl text-white ">Não há links encurtados</p>
            ) : (
              link.map((link) => (
                <div key={link.id}>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground  ">
                    {link.original}
                  </p>
                  Encurtado:{" "}
                  {/* <a
                      className="text-sm text-muted-foreground dark:text-muted-foreground "
                      href={link.original}
                    >
                      {link.shortedNameLink}/{link.shortedCode}
                    </a> */}
                  {link.original.includes("https://") ? (
                    <a href={link.original}>
                      https://{link.shortedNameLink}/{link.shortedCode}
                    </a>
                  ) : (
                    <a href={link.original}>
                      http://{link.shortedNameLink}/{link.shortedCode}
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

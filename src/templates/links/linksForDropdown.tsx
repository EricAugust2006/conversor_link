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

export const LinksForDropDown: React.FC<GetLinksProps> = ({ close }) => {
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
        if (!res.ok) throw new Error("Erro ao buscar links");

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
      {link.map((link) => (
        <div key={link.id} className="flex flex-col items-center">
          <a href={link.original} target="_blank" rel="noopener noreferrer">
            {link.original}
          </a>
          <a href={`/${link.shortedNameLink}/${link.shortedCode}`} target="_blank" rel="noopener noreferrer">
            {`/${link.shortedNameLink}/${link.shortedCode}`}
          </a>
        </div>
      ))}
    </> 
  );
};
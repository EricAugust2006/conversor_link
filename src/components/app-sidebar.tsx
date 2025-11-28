"use client";
import { Link, X, Search, Unlink2, Unlink } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";

import { FileWarning } from "lucide-react";

interface LinkItem {
  id: string;
  original: string;
  shortedNameLink: string;
  shortedCode: string;
}

export function AppSidebar() {
  const [links, setLinks] = useState<LinkItem[]>([]);
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
        if (!res.ok) {
          console.log("Ocorreu um erro ao buscar os links");
        }
        const data = await res.json();
        setLinks(Array.isArray(data.links) ? data.links : []);
      } catch (error) {
        console.error("Erro ao buscar links:", error);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    }
    LinksList();

    const interval = setInterval(() => {
      LinksList();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  async function DeleteLink(id: string) {
    try {
      const res = await fetch(`/api/url?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) throw new Error("Erro ao deletar link");

      setLinks((prevLinks) => prevLinks.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Erro ao deletar link", error);
    }
  }

  return (
    <Sidebar className="bg-gradient-to-b from-[#0a0f1a] to-[#1a1f2e] text-white shadow-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 justify-center px-4 py-6 text-xl text-white font-bold text-center tracking-wide  backdrop-blur-md rounded-b-2xl shadow-md">
            <Link className="w-6 h-6" />
            Links
          </SidebarGroupLabel>
          <hr />
          <SidebarGroupContent className="mt-6  text-white">
            <SidebarMenu className=" text-white">
              <DropdownMenu>
                <DropdownMenuTrigger className="active:scale-95 flex text-white items-center justify-between gap-2 px-3 py-2 w-full rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium cursor-pointer  text-white">
                  <span className="flex text-white  items-center justify-center gap-6">
                    <span className="border-dashed border-2 border-white/10 p-2 rounded-full">
                      <Unlink2 className="w-5 h-5" />
                    </span>
                    Ver Links
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-2 bg-[#0f1522] overflow-auto max-h-[500px] border border-white/10 shadow-xl">
                  {loading && (
                    <div className="transition-all duration-300 ease-in-out  text-center px-4 py-2 text-gray-400 rounded flex flex-col justify-center items-center gap-2 border-dashed border-1 border-gray-400">
                      <span>
                        <Search />
                      </span>
                      Buscando Link...
                    </div>
                  )}

                  {!loading && links.length === 0 && (
                    <div className="text-center px-4 py-2 text-gray-400 rounded flex flex-col justify-center items-center gap-2 border-dashed border-1 border-gray-400">
                      <span>
                        <FileWarning />
                      </span>
                      Nenhum link encontrado
                    </div>
                  )}

                  {!loading &&
                    links.length > 0 &&
                    links.map((link) => (
                      <div key={link.id} className="flex flex-col p-2 gap-2">
                        <DropdownMenuItem className="flex justify-between items-center p-2 transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-blue-400 hover:underline">
                          <a
                            href={link.original}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.shortedNameLink}/{link.shortedCode}
                          </a>

                          <button
                            onClick={() => DeleteLink(link.id)}
                            className="cursor-pointer ml-2 text-red-400 hover:text-red-600"
                          >
                            <X />
                          </button>
                        </DropdownMenuItem>
                      </div>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

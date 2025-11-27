// aqui eu vou fazer o metodo pOST para mandar o link para o DB e criar elee
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkOriginal, linkNomeEncurtar, codeEncurtar } = body;

    if (!linkOriginal || !linkNomeEncurtar || !codeEncurtar)
      return new Response("Link Invalido", { status: 400 });

    const linkExisting = await prisma.link.findFirst({
      where: {
        OR: [
          { original: linkOriginal },
          { shortedNameLink: linkNomeEncurtar },
          { shortedCode: codeEncurtar },
        ],
      },
    });

    if (linkExisting) {
      console.log("Link ja cadastrado");
      return NextResponse.json("Link ja cadastrado", { status: 400 });
    }

    const newLink = await prisma.link.create({
      data: {
        original: linkOriginal,
        shortedNameLink: linkNomeEncurtar,
        shortedCode: codeEncurtar,
      },
    });

    if (!newLink) return NextResponse.json("Link Invalido", { status: 400 });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar link:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const links = await prisma.link.findMany();
    return NextResponse.json({ links }, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar link:", err);
    return NextResponse.json(
      { error: "Erro ao buscar link: Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json("Link Invalido", { status: 400 });
    }

    const link = await prisma.link.delete({
      where: {
        id: id,
      },
    });
    console.log("Link deletado:", link);
    return NextResponse.json(link, { status: 200 });
  } catch (err) {
    console.error("Erro ao deletar link", err);
    return NextResponse.json("Link Invalido", { status: 400 });
  }
}

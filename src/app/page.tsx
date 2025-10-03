"use client";
import Form from "@/templates/form";
import { GetLinks } from "@/templates/links/getLinks";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div
        className={`bg-[linear-gradient(135deg,black_50%,white_50%)] relative overflow-hidden h-screen w-screen`}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <Form />
        </div>
      </div>
    </>
  );
}

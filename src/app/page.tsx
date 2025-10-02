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
      <div className="relative overflow-hidden h-screen w-screen">
        <div className="absolute top-0 left-0 w-full h-full">
          <Form  />
          {modalOpen && (
            <div className="fixed top-0 left-0  h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
              <GetLinks close={toggleModal} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

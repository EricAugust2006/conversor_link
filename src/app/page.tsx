import Form from "@/templates/form";
import GetLinks from "@/templates/links/getLinks";

export default function Home() {
  return (
    <>
    <div className="overflow-hidden h-screen w-screen">

      <GetLinks/>
      <Form />
    </div>
    </>
  );
}

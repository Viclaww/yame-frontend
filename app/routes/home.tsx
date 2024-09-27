// import { Link } from "@remix-run/react";
import DasHead from "~/components/DasHead";
import Post from "~/components/Post";

export default function Home() {
  return (
    <section className="flex flex-col px-20">
      <DasHead />
      <section className="bg-[#292727] w-2/3 p-10 rounded-lg">
        <div>
          <Post />
        </div>
      </section>
    </section>
  );
}

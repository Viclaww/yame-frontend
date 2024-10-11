import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useState } from "react";
import Layout from "~/components/layout";
import Post from "~/components/Post";
import { getUser } from "~/data/userApi";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.userId;
  if (id) {
    const data = await getUser(parseInt(id));
    console.log(data);
    return json({ data });
  }
  return json({ message: "NO user found" });
};

export default function User() {
  const [tab, setTab] = useState("questions");
  return (
    <Layout>
      <div>
        <div className="flex relative w-full mb-[10%] h-[30vh] justify-center bg-yame-purple">
          <div className="w-36 h-36 relative mt-[17%] rounded-full overflow-hidden">
            <img
              src="/assets/avatar.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
        <section className="flex w-full flex-col justify-center items-center">
          <h2 className="md:text-4xl  text-xl font-medium">Olivera</h2>
          <p>@olivera123</p>
        </section>
        <section className="flex pb-[2px] w-full justify-around mt-10 border-b">
          <span
            role="button"
            tabIndex={0}
            onClick={() => setTab("questions")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setTab("questions");
              }
            }}
            className={`py-1  cursor-pointer  ${
              tab === "questions"
                ? "after:h-1 after:absolute relative after: after:bg-yame-purple after:w-10/12  after:bottom-0 after:left-2"
                : ""
            }`}
          >
            Questions
          </span>
          <span
            onClick={() => setTab("replies")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setTab("replies");
              }
            }}
            className={`py-1  cursor-pointer  ${
              tab === "replies"
                ? "after:h-1 after:absolute relative after: after:bg-yame-purple after:w-10/12  after:bottom-0 after:left-1"
                : ""
            }`}
            role="button"
            tabIndex={0}
          >
            Replies
          </span>
          <span
            onClick={() => setTab("saved")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setTab("saved");
              }
            }}
            className={`py-1  cursor-pointer  ${
              tab === "saved"
                ? "after:h-1 after:absolute relative after: after:bg-yame-purple after:w-10/12  after:bottom-0 after:left-1"
                : ""
            }`}
            role="button"
            tabIndex={0}
          >
            Saved
          </span>
        </section>
        <section className="p-10 flex flex-col">
          <Post
            post={{
              id: 2,
              text: "I need help on this",
              user_id: 2,
              createdAt: "2024-10-01T17:36:00.034Z",
              updatedAt: "2024-10-01T17:36:00.034Z",
            }}
          />
        </section>
      </div>
    </Layout>
  );
}

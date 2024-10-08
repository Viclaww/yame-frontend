import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { getPostById } from "~/data/Post";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.postid;
  if (id) {
    const data = await getPostById(parseInt(id));
    console.log(data);
    return json({ data });
  }
  return json({ message: "youuu" });
};

export default function Post() {
  return <div>This Post</div>;
}

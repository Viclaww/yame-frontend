import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Layout from "~/components/layout";
import Post from "~/components/Post";
import CreatePostComp from "~/data/CreatePost";
import { getPostById } from "~/data/Post";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.postid;
  if (!id) {
    return json({ message: "youuu" });
  }
  const data = await getPostById(parseInt(id));
  console.log(data);
  return json({ data });
};

export default function PostComp() {
  const data = useLoaderData<typeof loader>();
  if ("message" in data) {
    return (
      <Layout>
        <div className="flex flex-col p-10 h-full w-full overflow-auto">
          <p>{data.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex gap-5 flex-col p-10 h-full w-full overflow-auto">
        <Post post={data?.data.post} />
        <CreatePostComp isReply={true} />
      </div>
    </Layout>
  );
}

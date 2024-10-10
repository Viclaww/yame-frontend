import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Layout from "~/components/layout";
import Post from "~/components/Post";
import CreatePostComp from "~/data/CreatePost";
import { getCommentByPostId, getPostById } from "~/data/Post";
import { PostProps } from "~/data/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.postid;
  if (!id) {
    return json({ message: "youuu" });
  }
  const data = await getPostById(parseInt(id));
  const comments = await getCommentByPostId(parseInt(id));
  console.log(comments, "here");
  return json({ data, comments });
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
  console.log(data.comments, "here");

  return (
    <Layout>
      <div className="flex gap-5 flex-col p-10 h-full w-full overflow-auto">
        <Post post={data?.data.post} media={data?.data.media} />
        {data?.comments &&
          data.comments.length > 0 &&
          data.comments.map((comment: PostProps) => (
            <Post isReply={true} key={comment.text} post={comment} />
          ))}
        <CreatePostComp
          isReply={{
            user_id: data?.data.post.id,
            post_id: data?.data.post.user_id,
          }}
        />
      </div>
    </Layout>
  );
}

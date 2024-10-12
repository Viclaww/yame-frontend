import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, MetaFunction } from "@remix-run/react";
import Layout from "~/components/layout";
import Post from "~/components/Post";
import CreatePostComp from "~/data/CreatePost";
import { getCommentByPostId, getPostById } from "~/data/Post";
import { PostProps } from "~/data/types";
export const meta: MetaFunction = () => {
  return [
    { title: "Post | Huddle" },
    { name: "description", content: "Ask and get answers" },
  ];
};
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const id = params.postid;
  if (!id) {
    return json({ message: "youuu" });
  }
  const data = await getPostById(parseInt(id));
  const comments = await getCommentByPostId(parseInt(id));
  const cookie = request.headers.get("Cookie");

  if (!cookie || !cookie.includes("yame-user")) {
    if (!data) {
      return { data: null, user: null, comments: null };
    }
    return { data, user: null, comments };
  }
  let user;
  try {
    // Extract the yame-user cookie value and parse it
    const userCookie = cookie.split("yame-user=")[1]?.split(";")[0]; // Handle multiple cookies
    if (userCookie) {
      user = JSON.parse(decodeURIComponent(userCookie)); // Decode the cookie and parse JSON
    }
  } catch (error) {
    console.error("Error parsing yame-user cookie:", error);
    // return redirect("/login"); // Redirect to login if parsing fails
    if (!data) {
      return {
        message: "Failed to get Posts. Try again",
        user: null,
        comments,
      };
    }
  }
  if (!user) {
    return { data, user: null, comments };
  }

  console.log(comments, "here");
  return json({ data, user, comments });
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
        <Post
          user={data?.data.user}
          post={data?.data.post}
          media={data?.data.media}
        />
        {data?.comments &&
          data.comments.length > 0 &&
          data.comments.map((comment: PostProps) => (
            <Post
              user={comment.user}
              isReply={true}
              key={comment.text}
              post={comment}
            />
          ))}
        <CreatePostComp
          user={data?.user}
          isReply={{
            user_id: data?.data.post.id,
            post_id: data?.data.post.user_id,
          }}
        />
      </div>
    </Layout>
  );
}

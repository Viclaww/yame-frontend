import { useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getPosts } from "~/data/Post";
import { PostProps, TUser } from "~/data/types";
import Layout from "~/components/layout";
import CreatePostComp from "~/data/CreatePost";

type LoaderReturnValue = {
  posts: PostProps[] | string | null;
  user: TUser | null;
};

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderReturnValue> => {
  const posts = await getPosts();
  const cookie = request.headers.get("Cookie");

  if (!cookie || !cookie.includes("yame-user")) {
    if (!posts) {
      return { posts: null, user: null };
    }
    return { posts, user: null };
  }

  let user = null;
  try {
    // Extract the yame-user cookie value and parse it
    const userCookie = cookie.split("yame-user=")[1]?.split(";")[0]; // Handle multiple cookies
    if (userCookie) {
      user = JSON.parse(decodeURIComponent(userCookie)); // Decode the cookie and parse JSON
    }
  } catch (error) {
    console.error("Error parsing yame-user cookie:", error);
    // return redirect("/login"); // Redirect to login if parsing fails
    if (!posts) {
      return { posts: "Failed to get Posts. Try again", user: null };
    }
  }

  // If user is null after parsing
  if (!user) {
    return { posts, user: null };
  }
  if (!posts) {
    return { posts: "Failed to get Posts. Try again", user };
  }
  return { user, posts };
};

export default function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout user={data.user}>
      <div className="flex flex-col p-10 h-full w-full overflow-auto">
        <CreatePostComp />
        {data && typeof data.posts == "string" ? (
          <p>{data.posts}</p>
        ) : (
          Array.isArray(data?.posts) &&
          data.posts.map((post: PostProps) => (
            <Post key={post.id + post.text} post={post} />
          ))
        )}
      </div>
    </Layout>
  );
}

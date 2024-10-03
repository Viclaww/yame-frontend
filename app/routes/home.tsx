// import { Link } from "@remix-run/react";
import { json, useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getPosts } from "~/data/Post";
import { PostProps } from "~/data/types";
import Layout from "~/components/layout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const posts = await getPosts();
  const cookie = request.headers.get("Cookie");
  if (!cookie || !cookie.includes("yame-user")) {
    return json({ posts, user: null });
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
    return redirect("/login"); // Redirect to login if parsing fails
  }

  // If user is null after parsing
  if (!user) {
    return json({ posts, user: null });
  }
  return json({ user, posts });
};

export default function Home() {
  const data = useLoaderData<typeof loader>();

  console.log(data);
  return (
    <Layout>
      <div className="flex flex-col p-10 h-full w-full overflow-auto">
        {data &&
          data?.posts.map((post: PostProps) => (
            <Post key={post.id + post.text} post={post} />
          ))}
      </div>
    </Layout>
  );
}

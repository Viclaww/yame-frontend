import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // Parse media array from the form data
  const media = formData.getAll("media[]").map((mediaItem) => {
    if (typeof mediaItem === "string") {
      return JSON.parse(mediaItem);
    }
    return mediaItem;
  });

  // Prepare the post data for the backend

  const postData = new FormData();

  postData.append("text", formData.get("text") as string);
  postData.append("media", JSON.stringify(media) as string);
  postData.append("user_id", formData.get("user_id") as string);
  postData.append("post_id", formData.get("post_id") as string);

  const response = await fetch("https://hackathon-pr.onrender.com/comment", {
    method: "POST",
    body: postData,
  });

  console.log("response", postData, await response.json());

  return json({ message: "Post created successfully!" });
};

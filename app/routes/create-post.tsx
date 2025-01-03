import { json } from "@remix-run/react";

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  // Parse media array from the form data
  const media = formData.getAll("media[]").map((mediaItem) => {
    if (typeof mediaItem === "string") {
      return JSON.parse(mediaItem);
    }
    return mediaItem;
  });

  // Prepare the post data for the backend
  const postData = {
    text: formData.get("text") as string,
    media, // Parsed media array
    user_id: Number(formData.get("user_id")),
  };

  const response = await fetch(`https://hackathon-pr.onrender.com/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  console.log("response", response);

  return json({ message: "Post created successfully!" });
};

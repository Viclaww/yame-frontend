import { json } from "@remix-run/react";

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const postData = {
    text: formData.get("text") as string,
    media: formData.get("media")?.toString().split(","),
    userId: formData.get("userId"),
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

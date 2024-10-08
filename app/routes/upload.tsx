import { v2 as cloudinary } from "cloudinary";
import {
  json,
  unstable_parseMultipartFormData,
  UploadHandler,
} from "@remix-run/node";
import { PassThrough } from "stream";

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};
// Set up Cloudinary config
cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
});

function asyncIterableToReadableStream(
  asyncIterable: AsyncIterable<Uint8Array>
): NodeJS.ReadableStream {
  const passThrough = new PassThrough(); // Node.js stream
  (async () => {
    for await (const chunk of asyncIterable) {
      passThrough.write(chunk);
    }
    passThrough.end();
  })();
  return passThrough;
}

export const action = async ({ request }: { request: Request }) => {
  const uploadHandler: UploadHandler = async ({ name, data }) => {
    if (name !== "image") return undefined;

    // Create a new promise to handle the Cloudinary upload stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "hackathon-pr" }, // Optional: set a folder in Cloudinary
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      // Pipe the file data into the Cloudinary upload stream
      asyncIterableToReadableStream(data).pipe(uploadStream);
    });

    return (uploadResult as { secure_url: string }).secure_url; // Return the uploaded image URL
  };

  // Parse the form data
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  // Collect all image URLs
  const imageUrls: string[] = [];
  formData.forEach((value, key) => {
    if (key === "image" && typeof value === "string") {
      imageUrls.push(value);
    }
  });

  // Return the uploaded image URLs
  return json({ imageUrls });
};

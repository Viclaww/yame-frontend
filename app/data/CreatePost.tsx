import { useState, useRef } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { TUser } from "./types";

const CreatePostComp = ({
  user,
  isReply,
}: // media,
{
  user?: TUser;
  isReply?: { post_id: number; user_id: number };
  media?: string[];
}) => {
  // console.log(user);
  // const [isCreating, setIsCreating] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null); // Ref for the image input
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [postText, setPostText] = useState("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(
        0,
        5 - selectedImages.length
      );
      setSelectedImages([...selectedImages, ...selectedFiles]);
    }
  };
  const handleImageDelete = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const uploadImages = async () => {
    const formData = new FormData();

    // Append all the images to the form data
    selectedImages.forEach((file) => {
      formData.append("image", file); // This matches the "name" used in the server-side handler
    });
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const result = await response.json();
      console.log("Image URLs:", result.imageUrls);
      return result.imageUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handlePost = async () => {
    if (!postText) {
      return;
    }
    const imageUrls = await uploadImages();
    const post = new FormData();
    post.append("text", postText);
    imageUrls.forEach((url: string) => {
      const img = { src: url, user_id: user?.id };
      post.append(`media[]`, JSON.stringify(img));
    });
    if (isReply) {
      post.append("post_id", isReply?.post_id.toString());
    }
    if (user?.id) {
      post.append("user_id", user.id.toString());
    }
    const endpoint = isReply ? "/create-comment" : "/create-post";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: post,
      });

      if (!response.ok) {
        throw new Error("Failed to create post.");
      }

      await response.json();

      setPostText("");
      setSelectedImages([]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="w-full flex flex-col border-b border-[#5c5c5c] py-2">
      <textarea
        placeholder={isReply ? "Answer This question" : "Ask your Questions"}
        name="postText"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        rows={1}
        className="bg-transparent py-5 resize-none outline-none"
      ></textarea>
      <input
        type="file"
        id="imageInput"
        className="hidden"
        multiple
        onChange={(e) => handleImageChange(e)}
        accept=".jpg, .jpeg, .png, .gif, .webp"
        ref={imageInputRef}
      />
      <div className="flex gap-5 overflow-auto w-full">
        {selectedImages.map((image, index) => (
          <div
            onClick={() => handleImageDelete(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleImageDelete(index);
              }
            }}
            tabIndex={0}
            role="button"
            key={image.name}
            className="flex rounded-xl overflow-hidden relative w-52 h-52 gap-4"
          >
            <span className="absolute right-3 top-2">
              <BiX size={30} />
            </span>
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full">
        <button
          onClick={() => {
            if (imageInputRef.current) {
              imageInputRef.current.click();
            }
          }}
          className="text-white border-yame-purple border items-center text-xs flex w-fit px-2 py-2 rounded-full justify-self-end self-start"
        >
          <BiPlus className="dark:text-white text-yame-purple" size={20} />
        </button>
        <button
          onClick={handlePost}
          className="bg-yame-purple text-white flex w-fit px-4 py-2 rounded-full justify-self-end self-end"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostComp;

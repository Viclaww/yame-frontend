// /app/routes/create-post.tsx
import { useEffect, useRef, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { uploadImage } from "~/routes/cloudinary";
import { fileToAsyncIterable } from "./utils";

type AltImg = {
  src: string;
  alt: string;
  file: File;
};

export const loader: LoaderFunction = async () => {
  // Fetch any initial data if needed

  return json({
    CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUD_NAME,
    CLOUDINARY_API_KEY: import.meta.env.VITE_API_KEY,
    CLOUDINARY_API_SECRET: import.meta.env.VITE_API_SECRET,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const files = formData.getAll("productImages") as File[];

  const media = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const uploaded = await uploadImage(fileToAsyncIterable(files[i]));
      media.push((uploaded as { secure_url: string }).secure_url);
    }
  } catch (error) {
    console.error(error);
  }

  return json({ media });
};

console.log("Hello from create-post.tsx");

const CreatePostComp = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedImages, setSelectedImages] = useState<AltImg[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const autoGrow = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoGrow(textareaRef.current);
    }
  }, []);

  const handleImageDelete = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 5);
      const newImagePreviews = selectedFiles.map((file) => {
        return new Promise<File>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const newFile = new File([reader.result as BlobPart], file.name, {
              type: file.type,
            });
            resolve(newFile);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImagePreviews).then((images) => {
        const imagePreviews = images.map((file) => ({
          src: URL.createObjectURL(file),
          alt: file.name,
          file,
        }));
        setSelectedImages([...selectedImages, ...imagePreviews]);
      });
    }

    setIsDraggingOver(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 5);

      const newImagePreviews = selectedFiles.map((file) => {
        return {
          src: URL.createObjectURL(file),
          alt: file.name,
          file,
        };
      });

      setSelectedImages([...selectedImages, ...newImagePreviews]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      role="button"
      tabIndex={0}
      className={`flex flex-col  border-b py-2 ${
        isDraggingOver ? "border-yame-purple" : ""
      }`}
    >
      <input
        type="file"
        id="imageInput"
        className=""
        name="productImages"
        multiple
        onChange={(e) => handleImageChange(e)}
        accept=".jpg, .jpeg, .png, .gif, .webp"
      />
      <textarea
        placeholder="Ask your Questions"
        name="postText"
        rows={1}
        onInput={(e) => autoGrow(e.target as HTMLTextAreaElement)}
        className="bg-transparent py-2 resize-none outline-none"
        id=""
      ></textarea>
      <div className="flex gap-4 overflow-x-auto w-full">
        {selectedImages.map((image, index) => (
          <div
            className="w-56 h-44 overflow-hidden rounded-xl bg-white"
            key={image.alt}
          >
            <button
              onClick={() => handleImageDelete(index)}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleImageDelete(index);
                }
              }}
              className="absolute right-3 left-3"
              tabIndex={0}
            >
              <BiX size={30} />
            </button>
            <img
              className="w-full h-full object-cover object-center "
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          const imageInput = document.getElementById("imageInput");
          console.log(imageInput);
          if (imageInput) {
            (imageInput as HTMLInputElement).click();
          }
        }}
        className="text-white bg-red-800 items-center flex w-fit px-4 py-1 rounded-full justify-self-end self-start"
      >
        <BiPlus size={30} />
        Add Image
      </button>
      <button
        onClick={() => {
          // Handle form submission
          console.log("Posting...");
          const form = new FormData();
          selectedImages.forEach((image) => {
            form.append("productImages", image.file);
          });
          fetch("/create-post", {
            method: "POST",
            body: form,
          }).then((response) => {
            if (response.ok) {
              console.log("Images uploaded successfully");
            } else {
              console.error("Failed to upload images");
            }
          });
        }}
        className="bg-yame-purple text-white flex w-fit px-4 py-1 rounded-full justify-self-end self-end"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePostComp;

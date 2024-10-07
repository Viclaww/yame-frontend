import { useState, useRef } from "react";
import { BiPlus } from "react-icons/bi";

const CreatePostComp = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null); // Ref for the image input
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 5);
      setSelectedImages(selectedFiles);
    }
  };

  const uploadImages = async () => {
    const formData = new FormData();
    console.log("me", selectedImages);
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
      return result.imageUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  return (
    <div className="w-full flex flex-col">
      <textarea
        placeholder="Ask your Questions"
        name="postText"
        rows={1}
        className="bg-transparent py-2 resize-none outline-none"
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
      <div>
        {selectedImages.map((image) => (
          <div key={image.name} className="flex gap-4">
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="w-20 h-20 object-cover object-center"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          if (imageInputRef.current) {
            imageInputRef.current.click();
          }
        }}
        className="text-white items-center text-xs flex w-fit px-4 py-1 rounded-full justify-self-end self-start"
      >
        <BiPlus size={20} />
      </button>
      <button
        onClick={uploadImages}
        className="bg-purple-500 text-white flex w-fit px-4 py-1 rounded-full justify-self-end self-end"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePostComp;

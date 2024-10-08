import { CiHeart } from "react-icons/ci";
import { IoIosBookmarks } from "react-icons/io";
import { FcAssistant } from "react-icons/fc";
import { VscDeviceCamera } from "react-icons/vsc";
import { TbMessageDots } from "react-icons/tb";
import { PostProps } from "~/data/types";
import { timeAgo } from "~/data/utils";
import { Link } from "@remix-run/react";

export default function Post({ post }: { post: PostProps }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex flex-col cursor-pointer border-b border-b-white py-4 gap-5"
    >
      <div className="flex gap-4">
        <Link to={`/user/12`} className="w-14 h-15 rounded-full">
          <img
            className="w-full h-full rounded-full"
            src="/assets/avatar.png"
            alt=""
          />
        </Link>

        <div className="flex flex-col items-center">
          <span className="flex gap-3 items-center">
            <h2 className="text-xl font-medium ">Olivera</h2>
            <span className="text-[#7851A9]">@olivera</span>
          </span>
          <p>Posted {timeAgo(post.createdAt)}</p>
        </div>
      </div>
      <p>{post.text}</p>
      <div className="flex gap-6 shadow backdrop-blur-sm shadow-white items-center bg-gradient-to-t w-fit p-3 rounded-full from-[#6D6D6D] to-[#070707]">
        <span className="flex items-center gap-1 cursor-pointer">
          <CiHeart size={25} /> 300
        </span>
        <span className="flex items-center gap-1 cursor-pointer">
          <IoIosBookmarks size={25} /> 300
        </span>
        <span className="flex items-center gap-2 cursor-pointer">
          <TbMessageDots size={25} />
        </span>
        <span className="flex items-center gap-2 cursor-pointer">
          <FcAssistant size={25} />
        </span>
        <span className="flex items-center gap-2 cursor-pointer">
          <VscDeviceCamera size={25} />
        </span>
      </div>
    </Link>
  );
}

// import { CiHeart } from "react-icons/ci";
// import { IoIosBookmarks } from "react-icons/io";
// import { FcAssistant } from "react-icons/fc";
import { VscDeviceCamera } from "react-icons/vsc";
import { TbMessageDots } from "react-icons/tb";
import { PostProps, TUser } from "~/data/types";
import { timeAgo } from "~/data/utils";
import { Link } from "@remix-run/react";

export default function Post({
  post,
  user,
  isReply,
  media,
}: {
  post: PostProps;
  user: TUser;
  isReply?: boolean;
  media?: { src: string }[];
}) {
  console.log(post, media);
  return (
    <Link
      to={`/post/${post.id}`}
      className="dark:bg-transparent bg-white flex flex-col cursor-pointer border-b border-b-yame-purple dark:border-b-white py-4 gap-5"
    >
      <div className="flex gap-4">
        <Link to={`/user/12`} className="w-14 h-15 rounded-full">
          <img
            className="w-full h-full rounded-full"
            src="/assets/avatar.png"
            alt=""
          />
        </Link>

        <div className="flex flex-col">
          <span className="flex gap-3 items-center">
            <h2 className="text-xl font-medium ">
              {user ? user.username : "Ai"}
            </h2>
            {/* <span className="text-blue-600">@olivera</span> */}
            {isReply && <p>is Replying</p>}
          </span>
          <p>Posted {timeAgo(post.createdAt)}</p>
        </div>
      </div>
      <p>{post.text}</p>
      <div className="flex gap-5 overflow-auto w-full">
        {media &&
          media.map(({ src }, index) => (
            <div
              tabIndex={0}
              role="button"
              key={index}
              className="flex rounded-xl overflow-hidden relative bg-gray-600 w-52 h-52 gap-4"
            >
              <img
                src={src}
                alt={src + index}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
      </div>

      <div className="flex gap-6 shadow  backdrop-blur-md items-center bg-gradient-to-t w-fit p-3 rounded-full dark:bg-yame-purple">
        <span className="flex items-center gap-2 cursor-pointer">
          <TbMessageDots
            className="dark:text-white text-yame-purple"
            size={25}
          />
        </span>
        <span className="flex items-center gap-2 cursor-pointer">
          <VscDeviceCamera
            className="dark:text-white text-yame-purple"
            size={25}
          />
        </span>
      </div>
    </Link>
  );
}

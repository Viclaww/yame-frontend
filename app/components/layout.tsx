import { ReactNode } from "react";
import DasHead from "./DasHead";
import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
// import { BsPeople, BsPeopleFill } from "react-icons/bs";
// import { FaPenNib } from "react-icons/fa";
// import {
//   IoMdNotifications,
//   IoMdNotificationsOutline,
//   IoIosSearch,
// } from "react-icons/io";
import { Link, useLocation } from "@remix-run/react";
// import { PiPenNibLight } from "react-icons/pi";
import { TUser } from "~/data/types";

const Layout = ({
  children,
  user,
}: {
  children: ReactNode;
  user?: TUser | null;
}) => {
  const pathname = useLocation().pathname;
  const navItems = [
    {
      id: 1,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      icon: (active: boolean, fill?: string) =>
        active ? (
          <RiHome7Fill size={25} className="dark:text-white text-yame-purple" />
        ) : (
          <RiHome7Line size={25} className="dark:text-white text-yame-purple" />
        ),
      name: "Home",
      link: "/home",
    },
    // {
    //   id: 2,
    //   icon: (active: boolean) =>
    //     active ? (
    //       <BsPeopleFill size={25} className="dark:text-white text-yame-purple"/>
    //     ) : (
    //       <BsPeople size={25} className="dark:text-white text-yame-purple" />
    //     ),
    //   name: "People",
    //   link: "/people",
    // },
    // {
    //   id: 3,
    //   icon: (active: boolean, color?: string) =>
    //     active ? (
    //       <IoIosSearch size={25} className="dark:text-white text-yame-purple" fill={color} />
    //     ) : (
    //       <IoIosSearch size={25} className="dark:text-white text-yame-purple" />
    //     ),
    //   name: "Write",
    //   link: "/write",
    // },
    // {
    //   id: 4,
    //   icon: (active: boolean, color?: string) =>
    //     active ? (
    //       <FaPenNib size={25} className="dark:text-white text-yame-purple"fill={color} />
    //     ) : (
    //       <PiPenNibLight size={25} className="dark:text-white text-yame-purple" />
    //     ),
    //   name: "Write",
    //   link: "/write",
    // },
    // {
    //   id: 5,
    //   icon: (active: boolean) =>
    //     active ? (
    //       <IoMdNotifications size={25} className="dark:text-white text-yame-purple" />
    //     ) : (
    //       <IoMdNotificationsOutline size={25} className="dark:text-white text-yame-purple" />
    //     ),
    //   name: "Notifications",
    //   link: "/notifications",
    // },
  ];
  return (
    <section className="flex flex-col md:px-20 px-4">
      <DasHead isUser={Boolean(user)} />
      <nav className=" flex z-50 items-center gap-5 py-1 px-4 dark:bg-black bg-white border-yame-purple border-[1px] md:left-1/3 absolute self-center bottom-5 md:bottom-10 rounded-full">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`flex items-center gap-2 p-3 text-white  rounded-full`}
          >
            {pathname.includes(item.link)
              ? item.icon(pathname.includes(item.link), "#7851A9")
              : item.icon(pathname.includes(item.link), "fff")}
          </Link>
        ))}
        <Link
          to={`/user/${user?.id}`}
          className={` w-12 h-12 p-[1px] rounded-full ${
            pathname.includes("user") ? "border-[2px] border-yame-purple" : ""
          }`}
        >
          <img
            src="/assets/avatar.png"
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
      </nav>
      <div className="flex gap-6">
        <section className="dark:bg-transparent border border-yame-purple overflow-auto h-[85vh] w-full lg:w-2/3 rounded-lg">
          <div className="">{children}</div>
        </section>
        {/* Trending  */}
        <div className="lg:flex md:w-1/3 hidden gap-3 flex-col">
          <div className="dark:bg-transparent dark:border-1 border border-yame-purple rounded-xl  p-5 gap-4 flex flex-col">
            <h2 className="text-2xl font-semibold">Trending Topics</h2>
            <div className="flex gap-4 flex-col">
              <article>
                <p className="text-xs font-semibold text-[#7851A9]">
                  Trending Now - Maths
                </p>
                <h2 className="text-xl font-semibold">Calculus</h2>
                <p className="text-xs  font-semibold text-[#4E4E4E]">
                  180 post
                </p>
              </article>
              <article>
                <p className="text-xs font-semibold text-[#7851A9]">
                  Trending Now - Maths
                </p>
                <h2 className="text-xl font-semibold">Calculus</h2>
                <p className="text-xs  font-semibold text-[#4E4E4E]">
                  180 post
                </p>
              </article>
              <article>
                <p className="text-xs font-semibold text-[#7851A9]">
                  Trending Now - Maths
                </p>
                <h2 className="text-xl font-semibold">Calculus</h2>
                <p className="text-xs  font-semibold text-[#4E4E4E]">
                  180 post
                </p>
              </article>
            </div>
          </div>
          <div className="border-yame-purple border rounded-xl  p-5 gap-4 flex flex-col">
            <h2 className="text-2xl font-semibold">Topics</h2>
            <article className="flex justify-between gap-4">
              <p>Maths</p>
              <button className="py-1 px-3 rounded-full  bg-yame-purple">
                Follow
              </button>
            </article>
            <article className="flex justify-between gap-4">
              <p>Maths</p>
              <button className="py-1 px-3 rounded-full  bg-yame-purple">
                Follow
              </button>
            </article>
            <article className="flex justify-between gap-4">
              <p>Maths</p>
              <button className="py-1 px-3 rounded-full  bg-yame-purple">
                Follow
              </button>
            </article>
            <article className="flex justify-between gap-4">
              <p>Maths</p>
              <button className="py-1 px-3 rounded-full  bg-yame-purple">
                Follow
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;

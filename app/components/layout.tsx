import { ReactNode } from "react";
import DasHead from "./DasHead";
import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { Link, useLocation } from "@remix-run/react";
import { PiPenNibLight } from "react-icons/pi";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = useLocation().pathname;
  const navItems = [
    {
      id: 1,
      icon: (active: boolean, color?: string) =>
        active ? (
          <RiHome7Fill size={25} fill={color} />
        ) : (
          <RiHome7Line size={25} color={color} fill={color} />
        ),
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      icon: (active: boolean, color?: string) =>
        active ? (
          <BsPeopleFill size={25} fill={color} />
        ) : (
          <BsPeople size={25} color={color} fill={color} />
        ),
      name: "People",
      link: "/people",
    },
    {
      id: 3,
      icon: (active: boolean, color?: string) =>
        active ? (
          <FaPenNib size={25} color="" fill={color} />
        ) : (
          <PiPenNibLight size={25} color={color} fill={color} />
        ),
      name: "Write",
      link: "/write",
    },
    {
      id: 4,
      icon: (active: boolean, color?: string) =>
        active ? (
          <IoMdNotifications size={25} fill={color} />
        ) : (
          <IoMdNotificationsOutline size={25} color={color} fill={color} />
        ),
      name: "Notifications",
      link: "/notifications",
    },
  ];
  return (
    <section className="flex flex-col px-20">
      <DasHead />
      <nav className=" flex shadow items-center gap-5 py-1 px-4 shadow-white bg-[#6D6D6D] left-1/3 md:absolute bottom-10 rounded-full">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`flex items-center gap-2 p-3 text-white  rounded-full ${
              pathname.includes(item.link) ? "bg-[#A89BB8]" : ""
            }`}
          >
            {pathname.includes(item.link)
              ? item.icon(pathname.includes(item.link), "#7851A9")
              : item.icon(pathname.includes(item.link), "fff")}
          </Link>
        ))}
        <Link
          to={`/user/1`}
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
        <section className="bg-[#292727] overflow-auto h-[85vh] w-2/3 rounded-lg">
          <div className="">{children}</div>
        </section>

        {/* Trending  */}
        <div className="bg-[#292727] w-1/3 p-5 gap-4 flex flex-col">
          <h2 className="text-2xl font-semibold">Trending Topics</h2>
          <div className="flex gap-4 flex-col">
            <article>
              <p className="text-xs font-semibold text-[#7851A9]">
                Trending Now - Maths
              </p>
              <h2 className="text-xl font-semibold">Calculus</h2>
              <p className="text-xs  font-semibold text-[#4E4E4E]">180 post</p>
            </article>
            <article>
              <p className="text-xs font-semibold text-[#7851A9]">
                Trending Now - Maths
              </p>
              <h2 className="text-xl font-semibold">Calculus</h2>
              <p className="text-xs  font-semibold text-[#4E4E4E]">180 post</p>
            </article>
            <article>
              <p className="text-xs font-semibold text-[#7851A9]">
                Trending Now - Maths
              </p>
              <h2 className="text-xl font-semibold">Calculus</h2>
              <p className="text-xs  font-semibold text-[#4E4E4E]">180 post</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;

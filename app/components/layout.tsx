import { ReactNode } from "react";
import DasHead from "./DasHead";
import { RiHome7Fill } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link, useLocation } from "@remix-run/react";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = useLocation().pathname;
  const navItems = [
    {
      id: 1,
      icon: (color?: string) => <RiHome7Fill size={25} fill={color} />,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      icon: (color?: string) => <BsPeople size={25} fill={color} />,
      name: "People",
      link: "/people",
    },
    {
      id: 3,
      icon: (color?: string) => <FaPenNib size={25} fill={color} />,
      name: "Write",
      link: "/write",
    },
    {
      id: 4,
      icon: (color?: string) => <IoMdNotifications size={25} fill={color} />,
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
            className={`flex items-center gap-2 p-3 hover:bg-[#292727] rounded-full ${
              pathname.includes(item.link) ? "bg-[#A89BB8]" : ""
            }`}
          >
            {pathname.includes(item.link) ? item.icon("#7851A9") : item.icon()}
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

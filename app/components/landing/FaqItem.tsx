/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const FaqItem = ({
  head,
  desc,
  index,
}: {
  head: string;
  desc: string;
  index: number;
}) => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <section
      onClick={() => setisOpen(!isOpen)}
      className={`flex cursor-pointer bg-white text-black flex-col border rounded-xl border-blueZ overflow-hidden  ease-in-out duration-500  px-5 ${
        isOpen ? "h-[220px] md:h-[120px] bg-blueZ/30" : "h-[65px] "
      }`}
      key={index}
    >
      <div className="flex items-center py-5 justify-between">
        <span className="font-medium  md:text-xl">{head}</span>
        <span
          onClick={() => setisOpen(!isOpen)}
          className={`  p-1 duration-300 rounded-full cursor-pointer ${
            isOpen ? "rotate-0 bg-X2Green" : "rotate-[360deg] bg-blueX"
          }`}
        >
          {isOpen ? <BiMinus size={15} /> : <BiPlus size={15} />}
        </span>
      </div>
      <span>{desc}</span>
    </section>
  );
};

export default FaqItem;

import { Link } from "@remix-run/react";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";

const Hero = () => {
  const [isOpened, setIsOpened] = useState(false);
  console.log("Hero", isOpened);
  return (
    <div className="flex flex-col relative justify-center w-full">
      <div className="flex flex-row justify-between relative z-30 p-6  w-full">
        <h2 className="text-3xl cursor-pointer">Yame</h2>
        <button
          onClick={() => setIsOpened(!isOpened)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <CgMenu size={30} />
        </button>
        <div
          className={`flex gap-2 flex-col md:flex-row md: duration-300 items-start bg-slate-600 absolute h-screen top-0 left-0 pt-10 pl-3 md:p-0 md:w-auto md:h-auto md:relative w-2/3 cursor-pointer ${
            isOpened ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Link
            to="/login"
            className="md:border border-white cursor-pointer py-1 flex md:justify-center w-[160px] rounded"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="md:bg-yame-purple cursor-pointer py-1 flex md:justify-center w-[160px] rounded"
          >
            Create Account
          </Link>
        </div>
      </div>
      <section className=" gap-4 z-10 relative w-full bg-brain2 bg-cover bg-origin-padding  bg-no-repeat bg-bottom flex flex-col items-center pt-10 md:pt-10 h-[100vh]  ">
        {/* <img
          className="absolute z-0 bottom-0 select-none"
          src="/assets/brain.png"
          alt=""
        /> */}
        <div className="text-center gap-3 flex-col flex items-center">
          <h1 className="md:text-7xl text-3xl font-medium">
            Unlock Knowlegde <br /> Anytime, Anywhere.
          </h1>
          <p>
            Ask questions, get answers, and learn from a community of learners
            and experts!
          </p>
          <div className="flex gap-2 flex-row-reverse">
            <button className="border cursor-pointer border-white py-1 w-[150px] rounded">
              Post a Question
            </button>
            <button className=" bg-yame-purple cursor-pointer py-1 w-[150px] rounded">
              Join Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

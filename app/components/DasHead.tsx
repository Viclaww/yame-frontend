import { Link } from "@remix-run/react";

export default function DasHead({ isUser }: { isUser: boolean }) {
  // const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="flex flex-row justify-between relative z-30 p-2 md:p-6 py-6  w-full">
      <h2 className="text-lg md:text-3xl cursor-pointer">Huddle</h2>
      {/* <button
        onClick={() => setIsOpened(!isOpened)}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <CgMenu size={30} />
      </button> */}
      {isUser ? (
        <div className="flex gap-2 cursor-pointer">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border px-2 border-white cursor-pointer py-1 flex justify-center w-fit md:w-[160px] rounded-lg"
            />
          </div>

          <Link
            to="/register"
            className="bg-yame-purple cursor-pointer py-1 flex justify-center w-fit px-4 md:w-[160px] rounded-lg"
          >
            Take Test
          </Link>
        </div>
      ) : (
        <div
          className={`flex gap-2 flex-col md:flex-row md: duration-300 items-start md:bg-transparent bg-slate-600 absolute h-screen top-0 left-0 pt-10 pl-3 md:p-0 md:w-auto md:h-auto md:relative w-2/3 cursor-pointer ${
            //  isOpened ? "translate-x-0" :
            "-translate-x-[150%] md:translate-x-0"
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
      )}
    </div>
  );
}

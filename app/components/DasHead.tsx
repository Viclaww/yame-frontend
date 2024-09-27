import { Link } from "@remix-run/react";

export default function DasHead() {
  return (
    <div className="flex flex-row justify-between relative z-30 p-6  w-full">
      <h2 className="text-3xl cursor-pointer">Yame</h2>
      <div className="flex gap-2 cursor-pointer">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border border-white cursor-pointer py-1 flex justify-center w-[160px] rounded"
          />
        </div>

        <Link
          to="/register"
          className="bg-yame-purple cursor-pointer py-1 flex justify-center w-[160px] rounded"
        >
          Take Test
        </Link>
      </div>
    </div>
  );
}

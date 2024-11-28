import { json, Link } from '@remix-run/react';
import React, { useState } from 'react';
import { CgMenu } from 'react-icons/cg';

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};
const PrivacyPolicy: React.FC = () => {
      const [isOpened, setIsOpened] = useState(false);
    return (
      <div className="flex flex-col py-10 px-14 gap-4">
        <div className="flex flex-row justify-between relative z-30 p-6  w-full">
          <h2 className="text-3xl cursor-pointer">huddle.</h2>
          <button
            onClick={() => setIsOpened(!isOpened)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <CgMenu size={30} />
          </button>
          <div
            className={`flex gap-2 flex-col md:flex-row md: duration-300 items-start md:bg-transparent bg-slate-600 absolute h-screen top-0 left-0 pt-10 pl-3 md:p-0 md:w-auto md:h-auto md:relative w-2/3 cursor-pointer ${
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

        <h1 className="text-3xl">Privacy Policy</h1>
        <p>
          Welcome to our Privacy Policy page! We want to assure you that we do
          not collect any personal information from our users. Our app is
          designed to provide information without requiring any data from you.
        </p>
        <h2 className="text-3xl">Changes</h2>
        <p>
          Our Privacy Policy may change from time to time. We will post any
          privacy policy changes on this page and, if the changes are
          significant, we will provide a more prominent notice.
        </p>
      </div>
    );
};

export default PrivacyPolicy;
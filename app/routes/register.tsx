import { Form, Link } from "@remix-run/react";

export default function Register() {
  return (
    <section className="bg-brain text-black w-screen h-screen justify-center items-center flex bg-50% bg-no-repeat bg-center">
      <div className="flex w-4/6 rounded-2xl items-center overflow-hidden bg-white h-5/6 ">
        <Form className="w-1/2 px-8 gap-5 flex items-center flex-col justify-center h-full">
          <h3 className="text-2xl flex justify-self-start self-start font-medium">
            Login
          </h3>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Email</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="Enter your Email Here"
              type="text"
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Password</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="Enter your Password"
              type="text"
            />
          </div>
          <button className="bg-yame-purple w-full text-white cursor-pointer py-2 flex justify-center rounded">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link className="text-yame-purple" to="/login">
              Register
            </Link>
          </p>
        </Form>
        <img src="/assets/login.png" className="w-1/2" alt="" />
      </div>
    </section>
  );
}

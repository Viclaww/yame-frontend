import { ActionFunction, json } from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import Loader from "~/components/Loader";
import { LoginWithGoogle } from "~/components/LoginGooglebtn";
import { login } from "~/data/userApi";

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};
import type { MetaFunction } from "@remix-run/node";
export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return json({ error: { email: "Invalid email address" } });
  }

  try {
    const response = await login(email, password);

    if (response?.data?.error) {
      return json({ error: response.data.error });
    }

    if (response?.data) {
      const user = response.data;
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `yame-user=${JSON.stringify(user)}; Path=/; HttpOnly`
      );
      return redirect("/home", { headers });
    }
    console.log(await login(email, password), "heeerrrr");
    return json({ error: response.error.message });
  } catch (error) {
    console.error("Registration failed", error);
    return json({ error: "Something went wrong. Please try again later." });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Huddle" },
    { name: "description", content: "Login to get ask and get answers" },
  ];
};

export default function Login() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <section className="bg-brain bg-cover text-black w-screen px-5 h-screen justify-center items-center flex md:bg-50% bg-no-repeat bg-center">
      <div className="flex lg:w-4/6 w-full rounded-2xl items-center overflow-hidden bg-white md:p-0 py-5 md:h-5/6 ">
        <Form
          method="post"
          className=" md:w-1/2 w-full px-8 gap-5 flex items-center flex-col justify-center h-full"
        >
          <h3 className="text-2xl flex justify-self-start self-start font-medium">
            Login
          </h3>
          {data?.error?.email && <p className="text-red-500">Invalid Email</p>}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Email</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="Enter your Email Here"
              name="email"
              type="text"
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Password</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="Enter your Password"
              name="password"
              type="password"
            />
          </div>
          <button
            type="submit"
            disabled={
              navigation.state == "loading" || navigation.state == "submitting"
            }
            className="bg-yame-purple w-full text-white cursor-pointer py-2 flex justify-center rounded"
          >
            {navigation.state == "loading" ||
            navigation.state == "submitting" ? (
              <Loader />
            ) : (
              "Login"
            )}
          </button>
          {data && data.error && (
            <p className="text-xs text-red-400">{data.error}</p>
          )}
          <p>
            Don&apos;t have an account?{" "}
            <Link className="text-yame-purple" to="/register">
              Register
            </Link>
          </p>
        </Form>
        <div className="md:flex h-full w-1/2 hidden lg:block">
          <img
            src="/assets/login.png"
            className="h-full w-full object-cover object-center"
            alt=""
          />
        </div>
        <LoginWithGoogle />
      </div>
    </section>
  );
}

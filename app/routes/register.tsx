import { ActionFunction } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import Loader from "~/components/Loader";
import { register } from "~/data/userApi";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Huddle" },
    { name: "description", content: "Login to get ask and get answers" },
  ];
};

export const loader = async () => {
  // You can perform any necessary server-side logic here
  return json({ message: "Upload route is working!" });
};
export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const username = formdata.get("full_name") as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return json({ error: { email: "Invalid email address" } });
  }

  if (password.length < 8) {
    return json({
      error: { password: "Password must be at least 8 characters" },
    });
  }

  try {
    const response = await register(email, username, password);
    console.log(response, "j");
    if (response.error) {
      return json({ error: response.error });
    }
    if (response?.data?.error) {
      return json({ error: response.data.error });
    }

    if (response?.data) {
      const user = response.data;
      const headers = new Headers();
      console.log(response.data);
      headers.append(
        "Set-Cookie",
        `yame-user=${JSON.stringify(user)}; Path=/; HttpOnly`
      );
      return redirect("/home", { headers });
    }

    return json({ error: "Unexpected error occurred, please try again." });
  } catch (err) {
    // Log error and return a meaningful message to the user
    console.error("Error during registration:", err);
    return json({ error: "An unexpected error occurred. Please try again." });
  }
};

export default function Register() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  return (
    <section className="bg-brain text-black w-screen h-screen justify-center items-center flex bg-50% bg-no-repeat bg-center">
      <div className="flex md:p-0 p-8 md:w-4/6 rounded-2xl items-center overflow-hidden bg-white md:h-5/6 ">
        <Form
          method="post"
          className="lg:w-1/2 w-full px-8 gap-5 flex items-center flex-col justify-center h-full"
        >
          <h3 className="text-2xl flex justify-self-start self-start font-medium">
            Create Account
          </h3>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Full Name</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="John Doe"
              type="text"
              name="full_name"
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Email</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="Enter your Email Here"
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="Full Name">Password</label>
            <input
              className="bg-[#EFF0F2] px-3 py-3 rounded"
              placeholder="Enter your Password"
              type="password"
              name="password"
            />
            {data?.error?.password && <p>{data.error.password}</p>}
          </div>
          <button
            className="bg-yame-purple w-full text-white cursor-pointer py-2 flex justify-center rounded"
            type="submit"
            disabled={
              navigation.state == "loading" || navigation.state == "submitting"
            }
          >
            {navigation.state == "loading" ||
            navigation.state == "submitting" ? (
              <Loader />
            ) : (
              "Create Account"
            )}
          </button>
          {data && data.error && (
            <p className="text-xs text-red-400">{data.error}</p>
          )}
          <p>
            Already have an account?{" "}
            <Link className="text-yame-purple" to="/login">
              Log in
            </Link>
          </p>
        </Form>
        <div className="md:flex h-full w-1/2 hidden lg:block">
          <img
            src="/assets/register.png"
            className="h-full w-full object-cover object-center"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

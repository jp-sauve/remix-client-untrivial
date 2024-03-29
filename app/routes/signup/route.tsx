import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { authCookie, createAccount } from "../../auth/auth";

export const meta = () => {
  return [{ title: "Untrivial Signup" }];
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let email = String(formData.get("email"));
  let password = String(formData.get("password"));

  console.warn("Incoming: ", email, password)

  let errors: { email?: String; password?: String; } = {}
  if (!email) {
    errors.email = "Email is required";
    console.log("=-=-=-=-= Email is required")
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address";
    console.log("-=-=-=- Please enter a valid email address");
  }
  if (!password) {
    errors.password = "Password is required"
    console.log("Password is required");
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters"
    console.log("Password must be at least 8 characters");
  }
  if (Object.keys(errors).length > 0) {
    console.error("Returning errors: ", errors)
    return { errors };
  }
  let user = await createAccount(email, password);
  console.warn("NEW USER", user)
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(user.id)
    }
  })
}

export default function Signup() {
  let actionData = useActionData<typeof action>();
  let emailError = actionData?.errors?.email;
  let passwordError = actionData?.errors?.password;

  return (
    <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          id="signup-header"
          className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign up now
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form className="space-y-6" method="post">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address{" "}
                {emailError && (
                  <span className="text-brand-red">{emailError}</span>
                )}
              </label>
              <input
                autoFocus
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password{" "}
                {passwordError && (
                  <span className="text-brand-red">{passwordError}</span>
                )}
              </label>
              <input
                autoFocus
                type="password"
                name="password"
                id="password"
                required
                autoComplete="current-password"
                aria-describedby="password-error"
                className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="submit"
              className="flex w-full bg-brand-blue px-1 py-1"
            >
              Sign In
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

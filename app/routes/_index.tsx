import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

// export const meta: MetaFunction = () => {
//   return [{ title: "Trellix, a Remix Demo" }];
// };

export default function Index() {
  return (
    <div className="h-full flex flex-col items-center pt-1 bg-slate-900">
      <img src="/logo-tr.png" alt="untrivial-logo" width="402" height="149" />
      <div className="space-y-2 max-w-md text-lg text-slate-300">
        <p>
          Welcome to Untrivial, the best app for running great trivia events.{" "}
        </p>
        <p>This app is in beta mode, and will open up soon! Leave feedback please!</p>
        <p>
          It's free for now, but will have a small fee for larger events.
          Want a new feature? Send us an email and we'll add it to the list!{" "}
        </p>
        <p>If you want to play around, click sign up!</p>
      </div>
      <div className="flex w-full justify-evenly max-w-md mt-8 rounded-3xl p-10 bg-slate-800">
        <Link
          to="/signup"
          className="text-xl font-medium text-brand-aqua underline"
        >
          Sign up
        </Link>
        <div className="h-full border-r border-slate-500" />
        <Link
          to="/login"
          className="text-xl font-medium text-brand-aqua underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

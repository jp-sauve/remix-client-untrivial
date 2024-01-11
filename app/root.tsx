import { Form, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref}
]
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        
        <div id="sidebar">
          <h1>Untrivial 1.0</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={true} id="search-spinner" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <ul>
              <li>
                <a href={`/contacts/1`}>Your Name</a>
              </li>
              <li>
                <a href={`/contacts/2`}>Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

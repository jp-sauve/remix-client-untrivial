import { Form, Links, Link, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { GameRecord } from "./data";
import appStylesHref from "./app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref}
]

import { getGames } from "./data";

export const loader = async () => {
  const games = await getGames();
  return json({ games });
};

export default function App() {
  const { games } = useLoaderData<typeof loader>();
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
                aria-label="Search games"
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
            {games.length ? (
              <ul>
                {games.map((game: GameRecord) => (
                  <li key={game.id}>
                    <Link to={`games/${game.id}`}>
                      {game.name || game.variant ? (
                        <>
                          {game.name} {game.variant}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {game.id ? <span>★</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

import { Form, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs
} from "@remix-run/node";
import { getGame, type GameRecord } from "../games_/data";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.gameId, "Missing game ID parameter");
  const game = await getGame(params.gameId);
  if (!game) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ game });
};
export default function Game() {
  const { game } = useLoaderData<typeof loader>();

  return (
    <div id="game">
      <div>
        <h1>
          {game.name || game.variant ? (
            <>
              {game.name} {game.variant}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite game={game} />
        </h1>

        {game.description ? <p>{game.description}</p> : null}

        {game.type ? <p>{game.type}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this game."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  game: Pick<GameRecord, "favorite">;
}> = ({ game }) => {
  const favorite = game.favorite;

  return (
    <Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};

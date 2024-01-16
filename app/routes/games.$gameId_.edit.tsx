import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getGame, updateGame } from "../data";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.gameId, "Missing gameId parameter");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateGame(params.gameId, updates);
  return redirect(`/games/${params.gameId}`);
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.gameId, "Missing gameId param");
  const game = await getGame(params.gameId);
  if (!game) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ game });
};

export default function EditGame() {
  const { game } = useLoaderData<typeof loader>();

  return (
    <Form id="game-form" method="post">
      <p>
        <span>Game {game.id}</span>
        <input
          defaultValue={game.id}
          aria-label="id"
          name="id"
          type="text"
          disabled
        />
        <input
          defaultValue={game.name}
          aria-label="Game Name"
          name="name"
          type="text"
          placeholder="The Name of the Game"
        />
        <input
          aria-label="Game Variant"
          defaultValue={game.variant}
          name="variant"
          placeholder="The Variant"
          type="text"
        />
        <input
          aria-label="Game Type"
          defaultValue={game.type}
          name="type"
          placeholder="The Type of game"
          type="text"
        />
      </p>
      <label>
        <span>Description</span>
        <textarea defaultValue={game.description} name="description" rows={6} />
      </label>
      <label>
        <input
          type="checkbox"
          id="favorite"
          name="favorite"
          checked={game.favorite}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}

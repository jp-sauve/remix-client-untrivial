import { Form } from "@remix-run/react";
import type { FunctionComponent } from "react";

import type { GameRecord } from "../data";

export default function Game() {
  const game = {
    name: "testname",
    variant: "variantname",
    type: "sometype",
    description: "something",
    favorite: true
  };

  return (
    <div id="contact">
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

        {game.description ? (
          <p>
            {game.description}
          </p>
        ) : null}

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

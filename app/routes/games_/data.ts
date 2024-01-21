////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-ignore - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type GameMutation = {
  id?: string;
  name?: string;
  variant?: string;
  type?: string;
  description?: string;
  favorite?: boolean;
};

export type GameRecord = GameMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeGames = {
  records: {} as Record<string, GameRecord>,

  async getAll(): Promise<GameRecord[]> {
    return Object.keys(fakeGames.records)
      .map((key) => fakeGames.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<GameRecord | null> {
    return fakeGames.records[id] || null;
  },

  async create(values: GameMutation): Promise<GameRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newGame = { id, createdAt, ...values };
    fakeGames.records[id] = newGame;
    return newGame;
  },

  async set(id: string, values: GameMutation): Promise<GameRecord> {
    const game = await fakeGames.get(id);
    invariant(game, `No game found for ${id}`);
    const updatedGame = { ...game, ...values };
    fakeGames.records[id] = updatedGame;
    return updatedGame;
  },

  destroy(id: string): null {
    delete fakeGames.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getGames(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let games = await fakeGames.getAll();
  if (query) {
    games = matchSorter(games, query, {
      keys: ["name", "variant"],
    });
  }
  return games.sort(sortBy("name", "createdAt"));
}

export async function createEmptyGame() {
  const game = await fakeGames.create({});
  return game;
}

export async function getGame(id: string) {
  return fakeGames.get(id);
}

export async function updateGame(id: string, updates: GameMutation) {
  const game = await fakeGames.get(id);
  if (!game) {
    throw new Error(`No game found for ${id}`);
  }
  await fakeGames.set(id, { ...game, ...updates });
  return game;
}

export async function deleteGame(id: string) {
  fakeGames.destroy(id);
}

[
  {
    name:
      "Checkers",
    variant: "Rainbow Rules",
    type: "Grid",
    description: "Black and white tokens move on a black and white staggered grid",
    favorite: true
  },
  {
    name:
      "Chess",
    variant: "Park Rules",
    type: "Strategy",
    description: "The most popular strategy game in the world.",
    favorite: true
  },
  {
    name:
      "Go",
    variant: "Atari",
    type: "Grid",
    description: "Game of surround and capture.",
  },
].forEach((game) => {
  fakeGames.create({
    ...game,
    id: `${game.name.toLowerCase()}-${game.variant.toLocaleLowerCase()}`,
  });
});
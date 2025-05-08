import Tile, { TileState } from "./Tile";

type TileRowProps = {
  target: string;
  guess: string;
  guessed: boolean;
};

/**
 * TileRow.tsx
 *
 * This component renders a row of tiles in the Wordle grid.
 *
 * @param target - The target word to guess.
 * @param guess - The current guess for the word.
 * @param guessed - Whether the guess has been made or not.
 */
export default function TileRow({ target, guess, guessed }: TileRowProps) {
  return (
    <div className="flex flex-row gap-2 justify-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <Tile
          key={i}
          letter={i < guess.length ? guess[i] : null}
          state={
            guessed ? stateForTile(target, guess[i], i) : TileState.Default
          }
        />
      ))}
    </div>
  );
}

/**
 * Helper function that determines the state of a tile based on the target word, the letter in the tile, and its position.
 *
 * @param target - The target word to guess.
 * @param letter - The letter in the tile.
 * @param letterPosition - The position of the letter in the tile.
 * @returns The state of the tile (Correct, PartiallyCorrect, Incorrect, or Default).
 */
function stateForTile(target: string, letter: string, letterPosition: number) {
  // First check if there is a letter in the tile. If not, return default state since there is nothing to compare
  if (!letter) {
    return TileState.Default;
  }

  // Compare ignoring case just to be safe
  const lowerLetter = letter.toLowerCase();
  const lowerTarget = target.toLowerCase();

  // If the letter is exactly in the correct spot (tile should be green)
  if (lowerTarget[letterPosition] === lowerLetter) {
    return TileState.Correct;
  }
  // If the letter is in the target but not the correct spot (tile should be yellow)
  else if (lowerTarget.includes(lowerLetter)) {
    return TileState.PartiallyCorrect;
  }
  // Otherwise letter not in the target at all (tile should be gray)
  else {
    return TileState.Incorrect;
  }
}

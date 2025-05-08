export enum TileState {
  Default, // This tile is either empty or contains a letter that has not been guessed yet (white background)
  Incorrect, // This tile contains a letter that is not in the word (dark grey)
  PartiallyCorrect, // This tile contains a letter that is in the word but in the wrong placement (yellow)
  Correct, // This tile contains a letter in the correct placement (green)
}

type TileProps = { letter: string | null; state: TileState };

/**
 * Helper function to get tile classes based on the letter and state.
 *
 * @param letter - The letter in the tile.
 * @param state - The state of the tile (Default, Incorrect, PartiallyCorrect, Correct).
 * @returns - The classes for the tile based on its state.
 */
function getTileClasses(letter: string | null, state: TileState) {
  switch (state) {
    // If the tile is in the default state, the text should be black and the border color should be Tailwind's slate-500 color.
    case TileState.Default:
      // Different border color if there's a letter vs. empty
      if (letter) {
        return "text-black border-slate-500 bg-white";
      } else {
        return "text-black border-slate-300 bg-white";
      }

    // If the tile is incorrect, the text should be white and the border color and background color should be Tailwind's slate-500 color.
    case TileState.Incorrect:
      return "text-white border-slate-500 bg-slate-500";

    // If the tile is partially correct, the text should be white and the border color and background color should be Tailwind's yellow-500 color.
    case TileState.PartiallyCorrect:
      return "text-white border-yellow-500 bg-yellow-500";

    // If the tile is correct, the text should be white and the border color and background color should be Tailwind's lime-600 color.
    case TileState.Correct:
      return "text-white border-lime-600 bg-lime-600";
  }
}

/**
 * Tile component that represents a single tile in the Wordle game.
 * It displays a letter and its state (correct, partially correct, incorrect).
 */
export default function Tile({ letter, state }: TileProps) {
  // Base classes for the tile - each tile should be a square with a width and height of 3.5rem (56px), with
  // a border of 2px, and centered 2xl bold text
  const baseClasses =
    "flex items-center justify-center w-14 h-14 text-2xl font-bold border-2 uppercase";
  // Get the classes for the tile based on its state and whether it has a letter, and whether the tile is correct, partially correct, or incorrect
  const tileStateClasses = getTileClasses(letter, state);

  // Uses interpolation to apply the classes to the div dynamically
  return (
    <div className={`${baseClasses} ${tileStateClasses}`}>
      {letter ? letter.toUpperCase() : ""}
    </div>
  );
}

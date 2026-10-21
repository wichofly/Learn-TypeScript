# Assembly: Endgame

**Can you save the programming world one letter at a time?** Guess the hidden word before eight wrong guesses eliminate every language on the screen. Win the round to celebrate with confetti, or start a new game and try another word.

This project is a playable word guessing game built with **React and TypeScript**. It is also a hands-on example of using TypeScript to describe game data, React state, component props, and functions.

## How to play

1. A random word is chosen when the game starts.
2. Pick letters using the on-screen keyboard. Correct guesses reveal letters; wrong guesses mark the key and eliminate a programming language.
3. Guess all the letters before the eight wrong guesses are used up.
4. When the round ends, choose **New Game** to play again.

## Run it locally

You’ll need Node.js and npm. From this folder, install the project dependencies and start the development server:

```sh
npm install
npm run dev
```

To check the TypeScript project and create a production build, run:

```sh
npm run build
```

To check the code with ESLint, run `npm run lint`.

## What the code does

`App.tsx` runs the game. React state keeps track of the current word and guessed letters. From those values, the app derives whether each guess is correct, whether the player has won, how many wrong guesses they have made, and whether the game is over. Starting a new game chooses another word and clears the guesses.

The word list and programming language chips are kept in separate data files. `utils.ts` contains reusable functions: one chooses a random item, another uses it to select a word, and another creates a farewell message when a wrong guess eliminates a language.

The interface is split into focused components:

| Component | What it displays or handles |
| --- | --- |
| `Header` | Game title and instructions |
| `GameStatus` | Farewell messages and win or loss messages |
| `LanguageChips` | Programming languages, marking one as eliminated after each wrong guess |
| `WordLetters` | Hidden word letters and revealed guesses |
| `Keyboard` | Letter buttons styled to show correct and incorrect guesses |
| `AriaLiveStatus` | Announces guesses and remaining attempts to screen readers |
| `ConfettiContainer` | Celebration when the player wins |
| `NewGameButton` | Offers a new round after the game ends |

The stylesheet sets the game’s colors and layout, and uses flexible rows so the keyboard and language chips can wrap to fit the screen.

## TypeScript concepts in the game

TypeScript adds types to JavaScript so the editor and build can catch many mistakes before the app runs. Here are a few examples from this project:

| TypeScript feature | Example in the project | What it means |
| --- | --- | --- |
| Basic types | `wrongGuessCount: number`, `isGameWon: boolean` | These values hold a number or a true/false value. |
| Arrays | `guessedLetters: string[]` | This array contains strings. |
| Object types | `Language` in `languages.ts` | Each language has a name and two color values. |
| Component props | `KeyboardProps`, `WordLettersProps` | These describe the data each component needs. |
| Function types | `addGuessedLetter: (letter: string) => void` | The callback accepts a string and returns no value. |
| Union types | `string | boolean` in `GameStatusProps` | The value can be a string or a boolean. |

For example, `Keyboard` receives the current word, the guessed letters, and a callback for adding a guess. Typing those props makes the component’s expectations visible and helps catch mistakes when using it.

## Project structure

```text
src/
├── components/   # Small, typed React components
├── App.tsx       # Game state and round logic
├── languages.ts  # Language names and chip colors
├── utils.ts      # Random selection and farewell helpers
└── words.ts      # Words used in the game
```

The app starts in `main.tsx`, which mounts the React app and loads the stylesheet.

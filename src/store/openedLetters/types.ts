import {GuessedWordEnum} from "../letters/enum.ts";

export interface OpenedLettersI {
    letters: Record<string, GuessedWordEnum>;
}
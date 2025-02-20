import {GuessedWordEnum} from "./enum.ts";

export interface LettersI {
    word: Record<string, number[]>,
    letters: string[][],
    status: GuessedWordEnum[][],
    length: number
}
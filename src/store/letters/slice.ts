import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LettersI} from "./types.ts";
import {GuessedWordEnum} from "./enum.ts";
import {setLength} from "./async.ts";

const generateWord = (length:number):string => {
    const characters = "йцукенгшщзхъфывапролджэячсмитьбю";

    let wordStr = ""

    for (let i = 0; i < length; i++) {
        const rand = Math.round(Math.random() * (characters.length - 1));

        wordStr += characters.charAt(rand)
    }

    return wordStr;
}

const generateInitialState = (newWord: string | null = null): LettersI => {
    const word = new Map<string, number[]>()
    let length = 0;

    if (!localStorage.getItem("length")) {
        localStorage.setItem("length", "5")
        length = 5
    } else {
        length = newWord !== null ? newWord.length : Number(localStorage.getItem("length"))
    }

    newWord = newWord ?? generateWord(length)

    newWord.split("").forEach((letter, index) => {

        if (word.has(letter)) {
            word.get(letter)?.push(index);
        } else {
            word.set(letter, [index])
        }
    });

    const letters: string[][] = Array(6).fill(Array(length).fill(""));
    const status: GuessedWordEnum[][] = []

    return {
        word: Object.fromEntries(word),
        letters,
        status,
        length
    }
}


const initialState: LettersI = generateInitialState()

export type WordType = typeof initialState.word;

const lettersSlice = createSlice({
    name: "letters",
    initialState,
    reducers: {
        setLetter(state, action: PayloadAction<{ row: number, column: number, letter: string }>) {
            if (action.payload.column === state.length) return;
            state.letters[action.payload.row][action.payload.column] = action.payload.letter;
        },
        removeLetter(state, action: PayloadAction<{ row: number, column: number }>) {
            state.letters[action.payload.row][action.payload.column] = "";
        },
        setLetterStatus(state, action: PayloadAction<{ status: GuessedWordEnum[], row: number }>) {
            const newRow: GuessedWordEnum[] = [];

            action.payload.status.forEach(st => {
                newRow.push(st);
            })

            state.status.push(newRow)
        },
        resetLetters(_, action: PayloadAction<string | null>) {
            return generateInitialState(action?.payload ?? null);
        }
    },
    extraReducers: builder => {
        builder.addCase(setLength.fulfilled, () => {

        })
    }
})

export const {setLetter, removeLetter, setLetterStatus, resetLetters} = lettersSlice.actions;

export default lettersSlice.reducer;
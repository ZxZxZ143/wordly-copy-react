import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OpenedLettersI} from "./types.ts";
import {GuessedWordEnum} from "../letters/enum.ts";

const initialState: OpenedLettersI = {
    letters: {}
}

const slice = createSlice({
    name: "letters",
    initialState,
    reducers: {
        setOpenedLetters(state, action: PayloadAction<Record<string, GuessedWordEnum>>) {
            for (const key in action.payload) {
                if (key in state.letters) {
                    if (action.payload[key] === GuessedWordEnum.ONPLACE) state.letters[key] = action.payload[key];
                }
                else state.letters[key] = action.payload[key];
            }
        },
        resetOpenedLetters(): OpenedLettersI {
            return {letters: {}}
        }
    }
})

export const {setOpenedLetters, resetOpenedLetters} = slice.actions;

export default slice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isEndI} from "./types.ts";
import {restartGame} from "./asyncAction.ts";

const initialState: isEndI = {
    isFinished: false,
    isWon: false,
}

const slice = createSlice({
    name: "isEnd",
    initialState,
    reducers: {
        setEnd(state, action: PayloadAction<isEndI>) {
            state.isFinished = action.payload.isFinished;
            state.isWon = action.payload.isWon;
        }
    },
    extraReducers: builder => {
        builder.addCase(restartGame.fulfilled, (): isEndI => {
            return initialState
        })
    }
})

export const {setEnd} = slice.actions

export default slice.reducer;
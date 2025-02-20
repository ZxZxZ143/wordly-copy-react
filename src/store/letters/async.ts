import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store.ts";
import {restartGame} from "../isEnd/asyncAction.ts";

export const setLength = createAsyncThunk<void, number, {dispatch: AppDispatch}>(
    "letters/setLength",
    async (length, {dispatch}) => {
        localStorage.setItem("length", length.toString())

        dispatch(restartGame(null))
    }
)
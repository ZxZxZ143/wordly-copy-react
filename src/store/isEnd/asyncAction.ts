import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store.ts";
import {resetActiveCell, setColumn} from "../activeCell/Slice.ts";
import {resetLetters} from "../letters/slice.ts";
import {resetOpenedLetters} from "../openedLetters/slice.ts";
import {setIsOpened} from "../isOpenPopUp/slice.ts";

export const restartGame = createAsyncThunk<void, string | null, { dispatch: AppDispatch }>(
    "isEnd/restartGame",
    async (word = null, {dispatch}) => {
        const length = Number(localStorage.getItem("length"));

        dispatch(resetActiveCell());
        dispatch(setIsOpened(false));
        dispatch(resetLetters(word !== undefined && word !== null ? word.toLowerCase() : null));
        dispatch(resetOpenedLetters());
        dispatch(setColumn({current: 0, length}));
    }
)
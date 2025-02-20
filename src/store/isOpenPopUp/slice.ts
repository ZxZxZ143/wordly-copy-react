import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IsOpenPopUp} from "./type.ts";

const initialState: IsOpenPopUp = {
    isOpened: false
}

const slice = createSlice({
    name: "generateWord",
    initialState,
    reducers: {
        setIsOpened(state, action: PayloadAction<boolean>) {
            state.isOpened = action.payload;
        }
    }
})

export const {setIsOpened} = slice.actions;

export default slice.reducer;
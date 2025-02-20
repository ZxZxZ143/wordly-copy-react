import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActiveCellI} from "./Types.ts";
import {setRow} from "./AsyncAction.ts";

const initialState: ActiveCellI = {
    row: 0,
    column: 0,
}

const ActiveCellSlice = createSlice({
    name: "activeCell",
    initialState,
    reducers: {
        setColumn: (state, action: PayloadAction<{current:number, length:number}>) => {
            if (state.column < action.payload.current && state.column < action.payload.length) {
                state.column = action.payload.current
            } else if (state.column > action.payload.current && state.column > 0) {
                state.column = action.payload.current
            }
        },
        resetActiveCell: (): ActiveCellI => {
            return initialState
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setRow.fulfilled, (state) => {
            state.row += 1;
            state.column = 0;
        })
    }
})

export const { setColumn, resetActiveCell} = ActiveCellSlice.actions;

export default ActiveCellSlice.reducer;
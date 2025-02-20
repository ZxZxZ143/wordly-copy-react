import { configureStore } from '@reduxjs/toolkit'
import ActiveCellReducer from "./activeCell/Slice.ts";
import LettersReducer from "./letters/slice.ts"
import OpenedLettersReducer from "./openedLetters/slice.ts"
import IsEndReducer from "./isEnd/slice.ts"
import isOpenedReducer from "./isOpenPopUp/slice.ts"

export const store = configureStore({
    reducer: {
        activeCell: ActiveCellReducer,
        letters: LettersReducer,
        openedLetters: OpenedLettersReducer,
        isEnd: IsEndReducer,
        isOpened: isOpenedReducer
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
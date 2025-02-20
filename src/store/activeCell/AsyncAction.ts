import {createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {ActiveCellI} from "./Types.ts";
import {setLetterStatus, WordType} from "../letters/slice.ts";
import {GuessedWordEnum} from "../letters/enum.ts";
import {setOpenedLetters} from "../openedLetters/slice.ts";
import {setEnd} from "../isEnd/slice.ts";
import {setIsOpened} from "../isOpenPopUp/slice.ts";


export const setRow = createAsyncThunk<void, void, { state: RootState, dispatch: Dispatch, rejectWithValue: number }>(
    "activeCell/setRow",
    async (_, {getState, dispatch, rejectWithValue}) => {
        const state: RootState = getState();
        const {row, column}: ActiveCellI = state.activeCell
        const length:number = state.letters.length;
        const word: WordType = state.letters.word;
        const currentWord: string[] = state.letters.letters[row]
        const openedLetters: Record<string, GuessedWordEnum> = {}

        if (column < length) {
            return rejectWithValue(400)
        }

        const status: GuessedWordEnum[] = new Array(length-1).fill(GuessedWordEnum.MISSED);
        let isWin = true;

        currentWord.forEach((letter, index) => {
            if (letter in word) {
                word[letter].map(indexInOrigin => {
                    if (status[index] !== GuessedWordEnum.ONPLACE) {
                        status[index] = index === indexInOrigin ? GuessedWordEnum.ONPLACE: GuessedWordEnum.INWORD
                        if (openedLetters[letter] !== GuessedWordEnum.ONPLACE)
                            openedLetters[letter] = index === indexInOrigin? GuessedWordEnum.ONPLACE: GuessedWordEnum.INWORD
                    }
                })
            } else {
                isWin = false;
                status.push(GuessedWordEnum.MISSED)
                openedLetters[letter] = GuessedWordEnum.MISSED;
            }
        })

        for (const st of status) {
            if (st !== GuessedWordEnum.ONPLACE) {
                isWin = false;
                break;
            }
        }

        if (isWin) {
            dispatch(setEnd({isFinished: true, isWon: true}))
            dispatch(setIsOpened(true))
        }
        else if (row+1 === 6) {
            dispatch(setEnd({isFinished: true, isWon: false}))
            dispatch(setIsOpened(true))
        }

        dispatch(setLetterStatus({status, row}));
        dispatch(setOpenedLetters(openedLetters))
    }
)
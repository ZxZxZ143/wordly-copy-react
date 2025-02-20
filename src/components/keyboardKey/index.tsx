import Style from "./keyboardKey.module.scss"
import BackspaceSVG from "../../assets/BackspaceSVG.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {ActiveCellI} from "../../store/activeCell/Types.ts";
import {setColumn} from "../../store/activeCell/Slice.ts";
import {removeLetter, setLetter} from "../../store/letters/slice.ts";
import {setRow} from "../../store/activeCell/AsyncAction.ts";
import {OpenedLettersI} from "../../store/openedLetters/types.ts";
import {GuessedWordEnum} from "../../store/letters/enum.ts";
import { useEffect, useRef} from "react";
import {isEndI} from "../../store/isEnd/types.ts";
import {IsOpenPopUp} from "../../store/isOpenPopUp/type.ts";
import * as React from "react";

const KeyboardKey: React.FC<{ letter: string }> & { Special: React.FC<{ letter: string }>} = ({letter}): JSX.Element => {
    const {row, column} = useSelector<RootState, ActiveCellI>(state => state.activeCell);
    const {isFinished} = useSelector<RootState, isEndI>(state => state.isEnd);
    const {isOpened} = useSelector<RootState, IsOpenPopUp>(state => state.isOpened);
    const length = useSelector<RootState, number>(state => state.letters.length)
    const dispatch = useDispatch<AppDispatch>();
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const {letters} = useSelector<RootState, OpenedLettersI>(state => state.openedLetters)

    let extraStyle = ""

    if (letter in letters) {
        switch (letters[letter]) {
            case GuessedWordEnum.MISSED:
                extraStyle = Style.missed
                break
            case GuessedWordEnum.INWORD:
                extraStyle = Style.inWord
                break
            case GuessedWordEnum.ONPLACE:
                extraStyle = Style.onPlace
                break
        }
    }

    const moveCellForward = (): void => {
        dispatch(setLetter({row, column, letter}));
        dispatch(setColumn({current: column +1, length}));
        buttonRef.current?.blur()
    }

    const pickFunction = (): () => void => {
        if (isFinished || isOpened) return () => {}
        return moveCellForward
    }

    useEffect(() => {
        const eventFunc = (event: KeyboardEvent) => {
            if (event.key === letter) {
                const func: () => void = pickFunction();

                func();
            }
        }

        document.addEventListener("keydown", eventFunc)

        return () => {
            document.removeEventListener("keydown", eventFunc)
        }
    }, [row, column, isFinished, isOpened, letter])

    return (
        <>
            <button ref={buttonRef} className={`${Style.cell} ${extraStyle}`} onClick={pickFunction()}>
                {letter}
            </button>
        </>
    )
}

const Special = ({letter}: {letter: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {row, column} = useSelector<RootState, ActiveCellI>(state => state.activeCell);
    const length = useSelector<RootState, number>(state => state.letters.length)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const {isFinished} = useSelector<RootState, isEndI>(state => state.isEnd);
    const {isOpened} = useSelector<RootState, IsOpenPopUp>(state => state.isOpened);

    const moveCellBackward = (): void => {
        dispatch(removeLetter({row, column: column - 1}));
        dispatch(setColumn({current: column -1, length}));
        buttonRef.current?.blur()
    }

    const moveCellDown = (): void => {
        dispatch(setRow());
        buttonRef.current?.blur()
    }

    const pickFunction = (): () => void => {
        if (isFinished || isOpened) return () => {}
        if (letter === "Backspace") return moveCellBackward;
        if (letter === "Enter") return moveCellDown;
        return () => {};
    }

    useEffect(() => {
        const eventFunc = (event: KeyboardEvent) => {
            if (event.key === letter) {
                const func: () => void = pickFunction();

                func();
            }
        }

        document.addEventListener("keydown", eventFunc)

        return () => {
            document.removeEventListener("keydown", eventFunc)
        }
    }, [row, column, isFinished, isOpened, letter])

    return (
        <button ref={buttonRef} className={`${Style.cell} ${Style.wide}`} onClick={pickFunction()}>
            {letter === "Backspace" ? <BackspaceSVG/> : letter}
        </button>
    );
};

KeyboardKey.Special = Special;

export default KeyboardKey;
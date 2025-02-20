import Style from "./win.module.scss"
import {restartGame} from "../../store/isEnd/asyncAction.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {isEndI} from "../../store/isEnd/types.ts";
import {useEffect} from "react";

export const getWinTitle = (): string => {
    return "Победа!"
}

function Win() {
    const dispatch = useDispatch<AppDispatch>();
    const {isFinished} = useSelector<RootState, isEndI>(state => state.isEnd);

    const keyFunc = (event: KeyboardEvent) => {
        if (event.key === "Enter" && isFinished) {
            restartGameFunc()
        }
    }

    const restartGameFunc = () => {
        dispatch(restartGame())

        document.removeEventListener("keydown", keyFunc)
    }

    useEffect(() => {
        document.addEventListener("keydown", keyFunc)

        return () => {
            document.removeEventListener("keydown", keyFunc)
        }
    }, [])

    return <>
        <div className={Style.answer_block}>
            Поздравляю!
        </div>
        <button onClick={restartGameFunc}>Еще раз</button>
    </>
}

export default Win;
import Style from "./lose.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {isEndI} from "../../store/isEnd/types.ts";
import {LettersI} from "../../store/letters/types.ts";
import {restartGame} from "../../store/isEnd/asyncAction.ts";
import {useEffect} from "react";

export const getLoseTitle = (): string => {
    return "Поражение!"
}

function Lose() {
    const {word, length} = useSelector<RootState, LettersI>(state => state.letters)
    const dispatch = useDispatch<AppDispatch>();
    const {isFinished} = useSelector<RootState, isEndI>(state => state.isEnd);

    const wordStr:string[] = new Array(length).fill("")

    for (const key in word) {
        word[key].forEach(index => {
            wordStr[index] = key;
        })
    }

    const keyFunc = (event: KeyboardEvent) => {
        if (event.key === "Enter" && isFinished) {
            restartGameFunc()
        }
    }

    const restartGameFunc = () => {
        dispatch(restartGame(null))

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
            <p>Ответ был:</p>
            <p className={Style.word}>{wordStr.join("").toUpperCase()}</p>
            <a>Что значит это слово?</a>
        </div>
        <button onClick={restartGameFunc}>Еще раз</button>
    </>
}

export default Lose;
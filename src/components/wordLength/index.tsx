import Style from "./wordLength.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {setLength} from "../../store/letters/async.ts";

function WordLength() {
    const lengths = [4,5,6,7,8,9,10,11]
    const length = useSelector<RootState, number>(state => state.letters.length)
    const dispatch = useDispatch<AppDispatch>();

    const setWordLength = (len: number) => {
        dispatch(setLength(len))
    }

    return <>
        <div className={Style.container}>
            {lengths.map(l => (
                <div key={l} className={`${Style.cell} ${length === l ? Style.active: ""}`} onClick={() => setWordLength(l)}>слова из {l} букв</div>
            ))}

        </div>
    </>
}

export default WordLength
import Style from "./Cell.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {GuessedWordEnum} from "../../store/letters/enum.ts";
import {LettersI} from "../../store/letters/types.ts";
import {useRef} from "react";

function Cell({passed = false, children, row, column, delay}: {
    children: string,
    passed: boolean,
    row: number,
    column: number,
    delay: number
}) {
    const {status} = useSelector<RootState, LettersI>(state => state.letters)
    const divRef = useRef<HTMLDivElement>(null);

    let extraStyle: string = "";
    let flipAnimation: string = "";

    if (passed) {
        if (status[row][column] !== "" && status[row][column] !== null) {
            flipAnimation += status[row][column] === GuessedWordEnum.INWORD ? Style.inWord : Style.onPlace;
        } else {
            flipAnimation += Style.passed;
        }
    }

    if (children !== "") extraStyle += ` ${Style.letter_appearance}`
    else {
        return (
            <>
                <div className={`${Style.cell}`}></div>
            </>
        )
    }

    return (
        <>
            <div className={extraStyle.trim()}>
                <div ref={divRef} style={{borderColor: !passed ? "#7B7F98" : "", animationDelay: `${delay}ms`}}
                     className={`${Style.cell} ${flipAnimation}`}>{children}</div>
            </div>
        </>
    )
}

export default Cell;
import Style from "./Words.module.scss"
import Cell from "../cell";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {LettersI} from "../../store/letters/types.ts";
import {ActiveCellI} from "../../store/activeCell/Types.ts";

function Words() {
    const {letters, length} = useSelector<RootState, LettersI>(state => state.letters);
    const {row} = useSelector<RootState, ActiveCellI>(state => state.activeCell);


    const createCells = (parentRow: number):JSX.Element[] => {
        return [...Array(length)].map((_, i):JSX.Element => {
            return <Cell key={i} passed={parentRow < row} row={parentRow} column={i} delay={i*250}>
                {letters[parentRow][i] !== undefined ? letters[parentRow][i]: ""}
            </Cell>
        })
    }


    return (
        <>
            <div className={Style.container}>
                {
                    [...Array(6)].map((_, i:number):JSX.Element => (
                        <div className={Style.row} key={i}>
                            {createCells(i)}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Words;
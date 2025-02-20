import Header from "./components/header";
import Words from "./components/words";
import Keyboard from "./components/keyboard";
import PopUp from "./components/popUp";
import WordLength from "./components/wordLength";
import Win, {getWinTitle} from "./components/win";
import Lose, {getLoseTitle} from "./components/lose";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {isEndI} from "./store/isEnd/types.ts";
import {IsOpenPopUp} from "./store/isOpenPopUp/type.ts";
import CreateWord, {getCreateWordTitle} from "./components/createWord";
import {useState} from "react";

function App() {
    const {isFinished, isWon} = useSelector<RootState, isEndI>(state => state.isEnd)
    const {isOpened} = useSelector<RootState, IsOpenPopUp>(state => state.isOpened)
    const [isGenerateWord, setIsGenerateWord] = useState<boolean>(false)

    const createPopUp = ():JSX.Element => {
        if (isOpened) {
            if (isGenerateWord) return <PopUp title={getCreateWordTitle()} setIsGenerateWord={setIsGenerateWord}>
                <CreateWord setIsGenerateWord={setIsGenerateWord}/>
            </PopUp>
            if (isFinished) return <PopUp title={isWon ? getWinTitle() : getLoseTitle()}>
                {
                    isWon ? <Win/> : <Lose/>
                }
            </PopUp>
        }
        return <></>
    }

    return (
        <>
            <div className={"wrapper"}>
                <Header setIsGenerateWord={setIsGenerateWord}/>
                <Words/>
                <Keyboard/>
                {createPopUp()}
                <WordLength/>
            </div>
        </>
    )
}

export default App

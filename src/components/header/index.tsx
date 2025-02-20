import Style from "./Header.module.scss"
import SettingsSVG from "../../assets/SettingsSVG.tsx";
import InfoSVG from "../../assets/InfoSVG.tsx";
import PlusSVG from "../../assets/PlusSVG.tsx";
import {useDispatch} from "react-redux";
import {setEnd} from "../../store/isEnd/slice.ts";
import {setIsOpened} from "../../store/isOpenPopUp/slice.ts";
import {SetStateAction} from "react";
import * as React from "react";

function Header({setIsGenerateWord}: {setIsGenerateWord: React.Dispatch<SetStateAction<boolean>>}) {
    const dispatch = useDispatch();

    const surrender = () => {
        dispatch(setEnd({isFinished: true, isWon: false}))
        dispatch(setIsOpened(true));
    }

    const openGenerateWord = () => {
        dispatch(setIsOpened(true));
        setIsGenerateWord(true)
    }

    return (
        <>
            <div className={Style.container}>
                <div className={Style.side}>
                    <div className={Style.generator} onClick={openGenerateWord}>
                        <PlusSVG/>
                    </div>
                    <div className={Style.surrender} onClick={surrender}>
                        <p>Я сдаюсь</p>
                    </div>
                </div>
                <div className={Style.side}>
                    <div className={Style.settings}>
                        <SettingsSVG/>
                    </div>
                    <div className={Style.info}>
                        <InfoSVG/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
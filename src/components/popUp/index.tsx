import Style from "./popUp.module.scss"
import CloseSVG from "../../assets/closeSVG.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {IsOpenPopUp} from "../../store/isOpenPopUp/type.ts";
import {setIsOpened} from "../../store/isOpenPopUp/slice.ts";
import * as React from "react";
import {SetStateAction} from "react";

export default function PopUp({title, children, setIsGenerateWord}: {title: string, children: JSX.Element, setIsGenerateWord?: React.Dispatch<SetStateAction<boolean>>}) {
    const {isOpened} = useSelector<RootState, IsOpenPopUp>(state => state.isOpened)
    const dispatch = useDispatch();

    const closePopUp = () => {
        dispatch(setIsOpened(false));
        if (setIsGenerateWord !== undefined) setIsGenerateWord(false);
    }

    if (!isOpened) {
        return <></>
    }

    return (
        <>
            <div className={Style.background}>
                <div className={Style.container}>
                    <div className={Style.header}>
                        <p>
                            {title}
                        </p>
                        <button onClick={closePopUp}>
                            <CloseSVG/>
                        </button>
                    </div>
                    <div className={Style.main}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
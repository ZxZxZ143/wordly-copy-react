import Style from "./createWord.module.scss"
import {ChangeEvent, SetStateAction, useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {restartGame} from "../../store/isEnd/asyncAction.ts";
import * as React from "react";

function CreateWord({setIsGenerateWord}: { setIsGenerateWord: React.Dispatch<SetStateAction<boolean>> }): JSX.Element {
    const [value, setValue] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>();

    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const generate = useCallback(() => {
        if (/^[А-я]{4,11}$/.test(value)) {
            dispatch(restartGame(value))
            setIsGenerateWord(false)
        }
    }, [])

    useEffect(() => {
        const keyFunc = (event:KeyboardEvent) => {
            if (event.key === "Enter") {
                generate()
            }
        }

        document.addEventListener("keypress", keyFunc)

        return () => {
            document.removeEventListener("keypress", keyFunc)
        }
    }, [value, generate]);

    return <>
     <div className={Style.container}>
         <p>Брось вызов другу с любым слово от 4 до 11 букв:</p>
         <input type="text" value={value} placeholder={"Введите слово..."} onChange={onChange}/>
         <button onClick={generate}>Создать!</button>
     </div>
    </>
}

export const getCreateWordTitle = (): string => {
    return "Wordly генератор"
}

export default CreateWord;
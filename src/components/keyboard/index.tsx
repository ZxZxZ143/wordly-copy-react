import Style from "./keyboard.module.scss"
import KeyboardKey from "../keyboardKey";

function Keyboard() {
    const keyboard: string[][] = [
        ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
        ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
        ["Backspace", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "Enter"]
    ]

    const createLetters = (row: string[]):JSX.Element[] => {
        return row.map((letter:string, index:number):JSX.Element => {
            return <KeyboardKey key={index} letter={letter} />
        })
    }

    return (
        <>
            <div className={Style.container}>
                {
                    keyboard.map((item, index):JSX.Element => (
                        <div className={Style.row} key={index}>
                            {createLetters(item)}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Keyboard;
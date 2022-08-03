import { useState,useEffect } from "react"

export const useGameLocalStorage = <T>(score:string,initialValue:T | (()=> T)) => {
    const [value,setValue] = useState<T>(()=> {
        const jsonValue = localStorage.getItem(score)
        if (jsonValue !== null) {
            return JSON.parse(jsonValue)
        }
        if (typeof initialValue === "function") {
            return (initialValue as ()=> T) ()
        } else {
            return initialValue
        }
    })
    useEffect(() => {
        localStorage.setItem(score,JSON.stringify(value))
    },[score,value])
    return [value,setValue] as [typeof value,typeof setValue]
}

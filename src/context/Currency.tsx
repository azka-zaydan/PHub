import { useContext, createContext, useState, ReactNode } from "react";

type CurrencyProviderProps = {
    children: ReactNode
}

type CurrencyContext = {
    idr: boolean
    convertIntoUSD: () => void
    convertIntoIDR: () => void
}

const currencyContext = createContext({} as CurrencyContext)

export const useCurrency = () => {
    return useContext(currencyContext)
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
    const [idr, setIdr] = useState(false)

    const convertIntoUSD = () => setIdr(false)
    const convertIntoIDR = () => setIdr(true)

    return (
        <currencyContext.Provider value={{ idr, convertIntoIDR, convertIntoUSD }}>
            {children}
        </currencyContext.Provider>
    )
}
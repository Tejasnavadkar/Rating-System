import { createContext, useContext, useState, type ReactNode } from "react";

type ContextType = {
    totalUsers:number | null,
    totalStores:number | null,
    setTotalUsers:React.Dispatch<React.SetStateAction<number | null>>,
    setTotalStores:React.Dispatch<React.SetStateAction<number | null>>,
    totalUsersSubmittedRating:number | null,
    setTotalUsersSubmittedRating:React.Dispatch<React.SetStateAction<number | null>>
};


const StoreContext = createContext<ContextType | null>(null)

export const useStore = () =>{   // custome hook to access context values
    const value = useContext(StoreContext)
    if(value == null) throw new Error("cant use outside of contextProvider")
    return value
}

export const ContextProvider = ({children}:{children:ReactNode}) => {

    const [totalUsers,setTotalUsers] = useState<number | null>(null)
    const [totalStores,setTotalStores] = useState<number | null>(null)
      const [totalUsersSubmittedRating,setTotalUsersSubmittedRating] = useState<number | null>(null)

    return (
        <StoreContext.Provider value={{totalStores,totalUsers,setTotalStores,setTotalUsers,totalUsersSubmittedRating,setTotalUsersSubmittedRating}}>
            {children}
        </StoreContext.Provider>
    )
}
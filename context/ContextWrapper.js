import { createContext, useState } from 'react';
import GlobalContext from "./GlobalContext";


export const ContextWrapper = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
   return (<GlobalContext.Provider value={{user,setUser,token,setToken}} >
       {children}
    </GlobalContext.Provider>)
}

export default ContextWrapper
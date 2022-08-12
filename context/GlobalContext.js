import { createContext} from 'react';


const AuthContext = createContext({
    user : {
        data: null,
        loggedIn: false,
        errors: null
    },
    login: () => {},
    logout:() => {},
    setToken: null,
    token: null,
})

export default AuthContext
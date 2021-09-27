import { createContext, useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
})

// children are, all the other components AuthContextProvider wraps
export const AuthContextProvider = ({ children }) => {
    // global user, to be able to track whether a user is logged in
    const [user, setUser] = useState(null)

    useEffect(() => {
    // init netlify identity connection
    netlifyIdentity.init()
    }, [])

    return (
        <AuthContext.Provider value={user}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext
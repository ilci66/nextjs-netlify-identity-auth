import { createContext, useState, useEffect } from 'react'
// will be necessary for logging in with identity
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            // adding this because apparently after the automatic closing of the 
            // modal there's a weird glitch 
            netlifyIdentity.close()
            console.log('login event')
        })

        netlifyIdentity.on('logout', () => {
            setUser(null);
            console.log('logout event')
        })

        // necessary for conditional rendering of the buttons and overall state of login
        netlifyIdentity.on('init', (user) => {
            setUser(user)
            setAuthReady(true)
            console.log('init event')
        })

        // init netlify identity connection
        netlifyIdentity.init()

        // in return unregister these to avoid duplicate code, might not be 
        // necessray in this case as I'm wrapping my application with it and it's
        // not going to be mounting on and off much, still good practise to add it 
        // and memorise it this way
        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])

  
    const login = () => {
        netlifyIdentity.open()
    }
    const logout = () => {
        netlifyIdentity.logout()
    }   

    const context = { user, login, logout, authReady }
    
    return (
        <AuthContext.Provider value={context}>
        { children }
        </AuthContext.Provider>
    )
}

export default AuthContext
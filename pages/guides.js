import { useContext, useEffect } from 'react'
import styles from '../styles/Guides.module.css'
import AuthContext from '../stores/authContext'

export default function Guides() {
  const { user, authReady } = useContext(AuthContext)

  // don't forget authReady is true when the connection is established
  useEffect(() => {
    if (authReady) {
      // dşdn't really now I could use logical and like this
      fetch('/.netlify/functions/guides', user && {
        headers: {
          // need to send the token to get the data
          Authorization:  'Bearer ' + user.token.access_token
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  // watch for both of these changes to avoid error messageas after refreshes and logouts
  },[user, authReady])

  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div> 
  )
}
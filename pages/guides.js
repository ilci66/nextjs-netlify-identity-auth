import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Guides.module.css'
import AuthContext from '../stores/authContext'

export default function Guides() {
  const { user, authReady, login } = useContext(AuthContext)
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  // don't forget authReady is true when the connection is established
  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/guides', user && {
        headers: {
          // need to send the token to get the data
          Authorization:  'Bearer ' + user.token.access_token
        }
      })
      .then(res => {
        
        // value of the ok changes according to the statuscode, you can use that here
        console.log(res.ok)

        if (!res.ok) {
          login()
          throw Error('You must be logged in to view the content')
        }
        return res.json()
      
      })
      .then(data => {
        setError(null)
        setGuides(data)
      })
      .catch(err => {
        // the err.message is the one I wrote above
        setError(err.message)
        setGuides(null)
      })
    }
  // watch for both of these changes to avoid error messageas after refreshes and logouts
  },[user, authReady])

  return (
    <div className={styles.guides}>
      
      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{ error }</p>
        </div>
      )}

      {guides && guides.map(guide => (
        <div key={guide.title} className={styles.card}>
          <h3>{ guide.title }</h3>
          <h4>written by {guide.author}</h4>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At corrupti iste ab magnam dignissimos id maxime rerum quae minima. Delectus maxime culpa est consequatur veritatis, perspiciatis cum corrupti possimus quis?</p>
        </div>
      ))}

    </div> 
  )
}
import Link from 'next/link'
import Image from 'next/image'
// need the context and the usecontext hoo to be able to reach the context provided
import { useContext } from 'react'
import AuthContext from '../stores/authContext'

export default function Navbar() {
  // it doesn't have to have the same name but user makes sense here
  const user = useContext(AuthContext)
  console.log("user ==>", user)

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} />
        <h1>Gaming Vibes</h1>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/guides"><a>Guides</a></Link></li>
        </ul>
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} />
      </div>
    </div>
  )
}
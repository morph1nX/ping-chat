"use client"; // This is a client component
import { useState } from "react"
import "tailwindcss/tailwind.css"
import app from '../utilities/firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'next/navigation'





function SignIn () {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const auth = getAuth(app)
    const router = useRouter()

    const handleSubmit =  (event: any) => {
        event.preventDefault()
        if (email && password) {

            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user

                console.log('logged in as ', user.email)
            }).then(() => {
                router.push('/chatroom')
            }).catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
        }
        
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
  <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-white rounded shadow-md">
    <label className="mb-2">
      Email:
      <input
        className="flex-grow p-2 rounded-l-md border border-gray-300"
        type="text"
        placeholder="Enter name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </label>
    <label className="mb-2">
      Password:
      <input
        className="flex-grow p-2 rounded-l-md border border-gray-300"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">
      Submit
    </button>
  </form>
</div>
    )
}

export default SignIn;
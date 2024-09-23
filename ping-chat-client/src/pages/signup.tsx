"use client"; // This is a client component
import { useState } from "react"

function SignUp () {

    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleSubmit = () => {

    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
            <label>Username:<input className="flex-grow p-2 rounded-l-md" type="text" placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
            <label>Password:<input className="flex-grow p-2 rounded-l-md" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <button type='submit' className="p-2 bg-blue-500 text-white rounded-r-md">Submit</button>
            </form>      
        </div>
    )
}

export default SignUp;
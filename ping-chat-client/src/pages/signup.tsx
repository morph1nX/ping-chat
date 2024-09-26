"use client"; // This is a client component
import { useState } from "react";
import "tailwindcss/tailwind.css";
import app from "../utilities/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth(app);
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("here?", username, password);
    if (email && password) {
      console.log("h?", username, password);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (username) {
            updateProfile(user, { displayName: username });
          }
          console.log("logged in as ", user);
        })
        .then(() => {
          router.push("/signin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 bg-white rounded shadow-md"
      >
        <label className="mb-2">
          Username:
          <input
            className="flex-grow p-2 rounded-l-md border border-gray-300"
            type="text"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
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
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;

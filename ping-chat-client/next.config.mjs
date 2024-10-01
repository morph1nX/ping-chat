/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  output: "export",
  //   env: {
  //     apiKey: process.env.FIREBASE_API_KEY,

  //     authDomain: "ping-chat-web.firebaseapp.com",

  //     projectId: "ping-chat-web",

  //     storageBucket: "ping-chat-web.appspot.com",

  //     messagingSenderId: "694422433583",

  //     appId: "1:694422433583:web:18fbfd1a46d10b2339bbda",
  //   },
};

export default nextConfig;

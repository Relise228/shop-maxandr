// import { Inter } from 'next/font/google';
import Layout from "@components/Layout"
import { useSession } from "next-auth/react"

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session } = useSession()
  return <Layout>Hey {session ? JSON.stringify(session, null, 2) : "stranger"}</Layout>
}

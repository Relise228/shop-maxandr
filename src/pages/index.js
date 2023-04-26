// import { Inter } from 'next/font/google';
import Layout from "@components/Layout"
import { useSession } from "next-auth/react"
import Link from "next/link"

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session } = useSession()

  // Hey {session ? JSON.stringify(session, null, 2) : "stranger"}

  return (
    <Layout>
      <div className="bg-preview-block bg-cover bg-center bg-no-repeat bg-fixed h-screen w-full relative">
        <div className="rounded-md bg-preview-bg-rgba backdrop-blur-md p-8  max-w-[720px] w-full h-72 absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center items-center justify-center">
          <h1 className="text-4xl font-medium text-heading">
            <span className="mb-2 block">🚀</span> Clothes Shop
          </h1>
          <h3 className="text-lg font-normal text-heading pt-3">Sub text</h3>
          <Link
            href="/explore"
            className="mt-6 text-xl font-medium text-white py-2 px-11 border border-green bg-green rounded-md hover:bg-white hover:border-green hover:border hover:text-green transition-all"
          >
            Discovery our collections
          </Link>
        </div>
      </div>
    </Layout>
  )
}

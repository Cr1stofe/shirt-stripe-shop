import Image from 'next/image'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import logoImg from '../assets/logo.svg'
import Link from 'next/link'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Ignite Shop',
  description: 'Os melhores produtos com o selo next level',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-gray-900 font-sans text-gray-100`}>

        {/* Container principal */}
        <main className="flex flex-col items-center justify-start min-h-screen">

          {/* Navbar */}
          <header className="p-8 w-full mx-auto my-0 max-w-[1376px] top-4">
            <Link href="/"> <Image src={logoImg} alt='' className='cursor-pointer'/> </Link>
          </header>
          
            {children}          
        </main>
      </body>
    </html>
  )
}

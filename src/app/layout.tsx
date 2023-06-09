import Image from 'next/image'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import logoImg from '../assets/logo.svg'

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
        <main className="flex flex-col items-start justify-center min-h-screen">
          <header className="p-8 w-full mx-auto my-0 max-w-[1376px]">
            <Image src={logoImg} alt='' />
          </header>
            {children}          
        </main>
      </body>
    </html>
  )
}

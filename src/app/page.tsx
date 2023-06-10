import Image from 'next/image'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'

export default async function Home() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100),
    }
  })

  return (

    /* Container */
    <div className="flex flex-col md:grid grid-cols-2 gap-12 w-full max-w-[1376px] my-0 mx-auto min-h-[656px] p-4">

      { /* map dos produtos */}
      {products.map(product => {
        return (

          /* Componente Product */
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="bg-gradient-to-b from-gradient-top to-gradient-bottom rounded-lg cursor-pointer relative overflow-hidden flex items-center justify-center group">
              <Image src={product.imageUrl} width={520} height={480} alt="" className='object-cover' />

              <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between bg-black/60 translate-y-96 transition-all ease-in-out duration-200 group-hover:translate-y-0 opacity-100">
                <strong className="text-xl"> {product.name} </strong>
                <span className="text-xl font-bold text-green-300"> {product.price} </span>
              </footer>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
import { CheckoutButton } from "@/components/CheckoutButton";
import { stripe } from "@/lib/stripe";
import axios from "axios";
import Image from "next/image"
import Stripe from "stripe";

interface ProductProps {
  params: {
    id: string
  }
}

export default async function Product({ params }: ProductProps) {
  async function getProductProps() {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100),
      description: product.description,
      defaultPriceId: price.id,
    }
  }

  const product = await getProductProps()

  return (

    /* Container principal */
    <main className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 items-stretch gap-16 m-auto max-w-6xl p-4">

      {/* Div que contém a imagem */}
      <div className="bg-gradient-to-b from-gradient-top to-gradient-bottom rounded-lg relative md:h-[656px] overflow-hidden flex items-center justify-center p-1">
        <Image src={product.imageUrl} width={520} height={480} alt="" className='object-cover' />
      </div>

      {/* Div que contém os detalhes do produto */}
      <div className="flex flex-col gap-8 md:gap-0">
        <h1 className="text-2xl font-bold text-gray-300"> {product.name} </h1>
        <span className="text-2xl text-green-300 md:mt-4 block"> {product.price} </span>

        <p className="text-md text-gray-100 md:mt-10"> {product.description} </p>

        <CheckoutButton priceId={product.defaultPriceId} />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { id: 'prod_O2V6anp1nHSmFB' }
  ]
}

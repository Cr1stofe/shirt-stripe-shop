import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation'

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface searchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Success({ searchParams }: searchParamsProps) {
  async function getProductProps() {
    if (!searchParams.session_id) {
      redirect('/')
    }

    const sessionId = String(searchParams.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    const customerName = session.customer_details?.name;
    const product = session.line_items?.data[0].price?.product as Stripe.Product

    return {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }

  const product = await getProductProps()

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-8 md:mt-32">

      <div className="bg-gradient-to-b from-gradient-top to-gradient-bottom w-40 rounded-full relative md:h-[160px] overflow-hidden flex items-center justify-center p-1">
        <Image src={product.product.imageUrl} width={150} height={150} alt="" className='object-cover' />
      </div>

      <h1 className="text-2xl font-bold text-gray-100"> Compra efetuada! </h1>

      <p className="text-xl text-gray-300 text-center">
        Uhuul <strong>{ product.customerName }</strong>, sua { product.product.name } já está a caminho da sua casa.
      </p>

      <Link href="/" className="text-lg text-green-500 font-bold">
        Voltar ao catálogo
      </Link>

    </div>
  )
}

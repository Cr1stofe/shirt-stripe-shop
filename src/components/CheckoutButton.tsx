'use client'

import axios from "axios";
import { useState } from "react";

interface CheckoutButtonProps {
    priceId: string
}

export function CheckoutButton({ priceId }: CheckoutButtonProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId,
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;

        } catch (error) {
            // Ideal seria conectar com uma ferramenta de observabilidade (Datadog / Sentry)
            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession} className="bg-green-500 px-8 py-5 rounded-lg text-gray-100 font-bold text-md transition duration-100 disabled:cursor-not-allowed disabled:opacity-70 enabled:hover:bg-green-300 md:mt-auto">
            Comprar agora
        </button>
    )

}
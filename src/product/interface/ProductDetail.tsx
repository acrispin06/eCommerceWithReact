import React from 'react'
import type {Product} from "../domain/Product.ts";

interface Props {
    product: Product
    onBack: () => void
}

export const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 bg-gray-500 text-gray py-1 px-4 rounded">
                Back
            </button>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <p className="text-gray-600">${product.price}</p>
            <p className="mt-2">{product.description}</p>
        </div>
    )
}

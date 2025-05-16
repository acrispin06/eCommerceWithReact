import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductDetail } from './ProductDetail'
import type {Product} from "../domain/Product.ts";
import {fetchProductById} from "../infraestructure/productAPI.ts";

export const ProductDetailWrapper: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        if (id) fetchProductById(Number(id)).then(setProduct)
    }, [id])

    if (!product) return <p>Loading Product...</p>

    return <ProductDetail product={product} onBack={() => navigate('/products')} />
}

"use client"
import React from "react"
import {observer} from "mobx-react-lite"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import CartStore from "@/store/CartStore"
import {IProduct} from "@/types"

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background-color: #fff;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
`

const CardContent = styled.div`
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: #333;
`

const Price = styled.p`
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #0070f3;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
`

const AddToCartButton = styled.button`
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #005bb5;
    }
`

const ViewDetailsButton = styled.button`
    background-color: transparent;
    color: #0070f3;
    border: 1px solid #0070f3;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #0070f3;
        color: white;
    }
`

interface ProductCardProps {
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = observer(({product}) => {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        CartStore.addToCart(product)
    }

    return (
        <Card>
            <Link href={`/products/${product.id}`} style={{textDecoration: "none", color: "inherit"}}>
                <ImageContainer>
                    <Image
                            src={product.image ? product.image : "/no-image.jpeg"}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            priority
                    />
                </ImageContainer>
                <CardContent>
                    <Title>{product.name}</Title>
                    <Price>${product.price}</Price>
                </CardContent>
            </Link>
            <CardContent>
                <ButtonsContainer>
                    <AddToCartButton onClick={handleAddToCart}>
                        В корзину
                    </AddToCartButton>
                    <Link href={`/products/${product.id}`} passHref>
                        <ViewDetailsButton>
                            Подробнее
                        </ViewDetailsButton>
                    </Link>
                </ButtonsContainer>
            </CardContent>
        </Card>
    )
})

export default ProductCard
'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {IProduct} from "@/types";
import Header from "@/components/Header";
import CartStore from "@/store/CartStore";

const ProductContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const CatalogContainer = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
`;


const CatalogLink = styled.span`
    cursor: pointer;

    &:hover {
        color: #0070f3;
        text-decoration: underline;
    }
`;

const ProductDetailsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ProductImageContainer = styled.div`
    position: relative;
    width: 100%;
    min-height: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        min-height: 300px;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductTitle = styled.h1`
    margin: 0 0 1rem;
    font-size: 2rem;
    color: #333;
`;

const ProductPrice = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    color: #0070f3;
    margin-bottom: 1.5rem;
`;

const ProductDescription = styled.p`
    margin-bottom: 2rem;
    line-height: 1.6;
    color: #666;
`;

const ProductCategory = styled.div`
    background-color: #f5f5f5;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #666;
`;

const ActionButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    margin-bottom: 1rem;
`;

const AddToCartButton = styled(ActionButton)`
    background-color: #0070f3;
    color: white;

    &:hover {
        background-color: #005bb5;
    }
`;

const BackButton = styled(ActionButton)`
    background-color: transparent;
    border: 1px solid #0070f3;
    color: #0070f3;

    &:hover {
        background-color: #f0f7ff;
    }
`;

interface ProductPageClientProps {
    product: IProduct;
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({product}) => {
    const router = useRouter();

    const handleAddToCart = () => {
        CartStore.addToCart(product);
    };

    return (
        <>
            <Header/>
            <ProductContainer>
                <CatalogContainer>
                    <CatalogLink onClick={() => router.push('/products')}>
                        Каталог
                    </CatalogLink>
                    <span>/</span>
                    <CatalogLink onClick={() => router.push(`/products`)}>
                        {product.category}
                    </CatalogLink>
                    <span>/</span>
                    <span>{product.name}</span>
                </CatalogContainer>

                <ProductDetailsContainer>
                    <ProductImageContainer>
                        <Image
                            src={product.image ? product.image : "/no-image.jpeg"}
                            alt={product.name}
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                    </ProductImageContainer>

                    <ProductInfo>
                        <ProductTitle>{product.name}</ProductTitle>
                        <ProductCategory>{product.category}</ProductCategory>
                        <ProductPrice>${product.price}</ProductPrice>
                        <ProductDescription>{product.description}</ProductDescription>

                        <AddToCartButton onClick={handleAddToCart}>
                            Добавить в корзину
                        </AddToCartButton>
                        <BackButton onClick={() => router.push('/products')}>
                            Вернуться к каталогу
                        </BackButton>
                    </ProductInfo>
                </ProductDetailsContainer>
            </ProductContainer>
        </>
    );
};

export default ProductPageClient;
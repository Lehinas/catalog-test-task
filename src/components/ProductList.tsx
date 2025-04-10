"use client"
import React, {useEffect} from "react"
import {observer} from "mobx-react-lite"
import styled from "styled-components"
import ProductCard from "@/components/ProductCard/ProductCard"
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton"
import ProductStore from "@/store/ProductStore"

const ProductsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
    }
`

const LoadMoreButton = styled.button`
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    display: block;
    margin: 0 auto;

    &:hover {
        background-color: #005bb5;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`

const ProductList: React.FC = observer(() => {
    useEffect(() => {
        ProductStore.initializeStore()
    }, [])

    const handleButton = () => {
        ProductStore.loadNextPage()
    }

    return (
            <ProductsContainer>
                <ProductsGrid>
                    {ProductStore.displayedProducts.map(product => (
                            <ProductCard key={product.id} product={product}/>
                    ))}
                    {ProductStore.isLoading && (
                            <>
                                <ProductCardSkeleton/>
                                <ProductCardSkeleton/>
                                <ProductCardSkeleton/>
                            </>
                    )}
                </ProductsGrid>

                {ProductStore.hasMoreProducts() && !ProductStore.isLoading && (
                        <LoadMoreButton onClick={handleButton}>
                            Показать больше
                        </LoadMoreButton>
                )}
            </ProductsContainer>
    )
})

export default ProductList

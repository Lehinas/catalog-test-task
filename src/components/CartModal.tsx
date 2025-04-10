"use client"
import React from "react"
import styled from "styled-components"
import Image from "next/image"
import {observer} from "mobx-react-lite"
import CartStore from "@/store/CartStore"

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
`

const ModalContent = styled.div`
    width: 100%;
    max-width: 400px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
`

const ModalTitle = styled.h2`
    margin: 0;
    font-size: 1.5rem;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`

const EmptyCart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
`

const CartItemContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
`

const ItemImage = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    margin-right: 1rem;
    border-radius: 4px;
    overflow: hidden;
`

const ItemInfo = styled.div`
    flex-grow: 1;
`

const ItemName = styled.h3`
    margin: 0 0 0.5rem;
    font-size: 1rem;
`

const ItemPrice = styled.p`
    margin: 0 0 0.5rem;
    font-weight: bold;
    color: #0070f3;
`

const ItemQuantity = styled.div`
    display: flex;
    align-items: center;
`

const QuantityButton = styled.button`
    background-color: #f5f5f5;
    border: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
    }
`

const QuantityInput = styled.input`
    width: 40px;
    text-align: center;
    border: 1px solid #ddd;
    margin: 0 0.5rem;
    padding: 0.25rem;
`

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #ff4d4f;
    cursor: pointer;
    padding: 0;
    font-size: 0.85rem;
    margin-left: auto;

    &:hover {
        text-decoration: underline;
    }
`

const CartFooter = styled.div`
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #eee;
`

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
`

const CheckoutButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #005bb5;
    }
`

const ClearCartButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: transparent;
    color: #ff4d4f;
    border: 1px solid #ff4d4f;
    border-radius: 4px;
    font-size: 1rem;
    margin-top: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #fff1f0;
    }
`

const CartModal: React.FC = observer(() => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            CartStore.toggleCart()
        }
    }

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity >= 1) {
            CartStore.updateQuantity(productId, newQuantity)
        }
    }

    return (
        <ModalOverlay onClick={handleBackdropClick}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Корзина</ModalTitle>
                    <CloseButton onClick={() => CartStore.toggleCart()}>×</CloseButton>
                </ModalHeader>

                {CartStore.items.length === 0 ? (
                        <EmptyCart>
                            <p>Ваша корзина пуста</p>
                        </EmptyCart>
                ) : (
                        <>
                            {CartStore.items.map((item) => (
                                    <CartItemContainer key={item.id}>
                                        <ItemImage>
                                            <Image
                                                    src={item.image ? item.image : "/no-image.jpeg"}
                                                    alt={item.name}
                                                    layout="fill"
                                                    objectFit="cover"
                                            />
                                        </ItemImage>
                                        <ItemInfo>
                                            <ItemName>{item.name}</ItemName>
                                            <ItemPrice>${item.price}</ItemPrice>
                                            <ItemQuantity>
                                                <QuantityButton
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </QuantityButton>
                                                <QuantityInput
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                />
                                                <QuantityButton
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </QuantityButton>
                                                <RemoveButton onClick={() => CartStore.removeFromCart(item.id)}>
                                                    Удалить
                                                </RemoveButton>
                                            </ItemQuantity>
                                        </ItemInfo>
                                    </CartItemContainer>
                            ))}

                            <CartFooter>
                                <TotalPrice>
                                    <span>Итого:</span>
                                    <span>${CartStore.totalPrice.toFixed(2)}</span>
                                </TotalPrice>
                                <CheckoutButton>Оформить заказ</CheckoutButton>
                                <ClearCartButton onClick={() => CartStore.clearCart()}>
                                    Очистить корзину
                                </ClearCartButton>
                            </CartFooter>
                        </>
                )}
            </ModalContent>
        </ModalOverlay>
    )
})

export default CartModal
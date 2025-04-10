"use client"
import React from 'react';
import {observer} from 'mobx-react-lite';
import Link from 'next/link';
import styled from 'styled-components';
import CartStore from "@/store/CartStore"
import CartModal from "@/components/CartModal"

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
    }
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    cursor: pointer;

    &:hover {
        color: #0070f3;
    }
`;

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

const CartButton = styled.button`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #333;

    &:hover {
        color: #0070f3;
    }
`;

const CartBadge = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ff4d4f;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    height: 18px;
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

const Header: React.FC = observer(() => {
    return (
        <HeaderContainer>
            <Link href="/products">
                <Logo>Lehinas Catalog Store</Logo>
            </Link>

            <NavContainer>
                <CartButton onClick={() => CartStore.toggleCart()}>
                    🛒
                    {CartStore.totalItems > 0 && (
                        <CartBadge>{CartStore.totalItems}</CartBadge>
                    )}
                </CartButton>
            </NavContainer>

            {CartStore.isOpen && <CartModal/>}
        </HeaderContainer>
    );
});

export default Header;
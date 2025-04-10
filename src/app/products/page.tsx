import React from "react"
import {Metadata} from "next"
import Header from "@/components/Header"
import ProductList from "@/components/ProductList"

export const metadata: Metadata = {
    title: "Каталог товаров | Lehinas Catalog Store",
    description: "Ознакомьтесь с нашим широким ассортиментом электроники и гаджетов. Смартфоны, ноутбуки, планшеты и многое другое.",
}

export default function ProductsPage() {
    return (
        <main>
            <Header/>
            <ProductList/>
        </main>
    )
}
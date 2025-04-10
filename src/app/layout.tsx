import React from "react"
import type {Metadata} from "next"
import {Roboto} from "next/font/google"
import "./globals.css"
import StyledComponentsRegistry from "@/lib/registry"

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin", "cyrillic"],
    display: "swap",
})

export const metadata: Metadata = {
    title: "Lehinas Catalog Store",
    description: "Интернет-магазин электроники и гаджетов",
    keywords: "смартфоны, ноутбуки, планшеты, электроника, гаджеты, интернет-магазин",
}

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className={roboto.className}>
                <StyledComponentsRegistry>
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
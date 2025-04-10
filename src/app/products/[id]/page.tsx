import React from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import productsData from "@/data/products.json";
import ProductPageClient from "@/app/products/[id]/productPageClient";
import type {Viewport} from 'next'


export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
    return productsData.map((product) => ({
        id: product.id.toString(),
    }));
}

export async function generateMetadata(
        {params}: Props,
): Promise<Metadata> {
    const {id} = await params;
    const product = productsData.find(p => p.id === parseInt(id))
    if (!product) {
        return {
            title: 'Товар не найден | Lehinas Catalog Store',
            description: 'Запрашиваемый товар не найден в нашем каталоге.'
        };
    }

    return {
        title: `${product.name} | Lehinas Catalog Store`,
        description: product.description.substring(0, 155),
    };
}

export default async function ProductDetailPage({params}: Props) {
    const {id} = await params;

    const product = productsData.find(p => p.id === parseInt(id));

    if (!product) {
        notFound();
    }

    return <ProductPageClient product={product}/>;
}
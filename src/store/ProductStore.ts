import {makeAutoObservable, runInAction} from 'mobx';
import productsData from '@/data/products.json';
import {IProduct} from "@/types";

class ProductStore {
	products: IProduct[] = [];
	displayedProducts: IProduct[] = [];
	isLoading: boolean = false;
	itemsPerPage: number = 3;
	totalProducts: number = 0;

	constructor() {
		makeAutoObservable(this);
	}

	async initializeStore() {
		this.isLoading = true;

		try {
			// имитация задержки
			const allProducts = productsData as IProduct[];
			await new Promise(resolve => setTimeout(resolve, 800));

			runInAction(() => {
				this.products = allProducts;
				this.totalProducts = allProducts.length;
				this.displayedProducts = [];
			});

			// загрузка первой страницы
			this.loadNextPage();
		} catch (error) {
			console.error('ошибка, которой быть не может):', error);
		} finally {
			runInAction(() => {
				this.isLoading = false;
			});
		}
	}

	loadNextPage() {
		this.isLoading = true;

		const start = this.displayedProducts.length;
		const end = start + this.itemsPerPage;

		setTimeout(() => {
			runInAction(() => {
				const newProducts = this.products.slice(start, end);
				console.log(start, end)

				this.displayedProducts = [
					...this.displayedProducts,
					...newProducts.filter(p => !this.displayedProducts.some(dp => dp.id === p.id))
				];
				this.isLoading = false;
			});
		}, 500); // имитация подгрузки (для скелетонов)
	}

	hasMoreProducts(): boolean {
		return this.displayedProducts.length < this.products.length;
	}
}

export default new ProductStore();

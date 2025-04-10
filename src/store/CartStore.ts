import {makeAutoObservable} from 'mobx';
import {ICartItem, IProduct} from "@/types";

class CartStore {
	items: ICartItem[] = [];
	isOpen: boolean = false;

	constructor() {
		makeAutoObservable(this);
		this.loadFromLocalStorage();
	}

	private loadFromLocalStorage() {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				try {
					this.items = JSON.parse(savedCart);
				} catch (e) {
					console.error('Ошибка для localstorage', e);
					this.items = [];
				}
			}
		}
	}

	private saveToLocalStorage() {
		localStorage.setItem('cart', JSON.stringify(this.items));
	}

	addToCart(product: IProduct) {
		const existingItem = this.items.find(item => item.id === product.id);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			this.items.push({...product, quantity: 1});
		}

		this.saveToLocalStorage();
	}

	removeFromCart(productId: number) {
		this.items = this.items.filter(item => item.id !== productId);
		this.saveToLocalStorage();
	}

	updateQuantity(productId: number, quantity: number) {
		const item = this.items.find(item => item.id === productId);

		if (item) {
			if (quantity <= 0) {
				this.removeFromCart(productId);
			} else {
				item.quantity = quantity;
				this.saveToLocalStorage();
			}
		}
	}

	clearCart() {
		this.items = [];
		this.saveToLocalStorage();
	}

	get totalItems() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}

	get totalPrice() {
		return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
	}

	toggleCart() {
		this.isOpen = !this.isOpen;
	}
}

export default new CartStore();
import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS:
			// init max price
			let maxPrice = action.payload.products.map(prod => prod.price);
			maxPrice = Math.max(...maxPrice);
			return {
				...state,
				all_products: [...action.payload.products], // ... makes a copy
				filtered_products: [...action.payload.products],
				filters: { ...state.filters, max_price: maxPrice },
			};
		case SET_GRIDVIEW:
			return { ...state, grid_view: true };
		case SET_LISTVIEW:
			return { ...state, grid_view: false };
		case UPDATE_SORT:
			return { ...state, sort: action.payload.value };
		case SORT_PRODUCTS:
			const { sort, filtered_products } = state;
			let sortedProducts = [...filtered_products];
			// ---------- sort functions ----------
			if (sort === 'price-highest') {
				sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
			} else if (sort === 'price-lowest') {
				sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
			} else if (sort === 'name-a') {
				sortedProducts = sortedProducts.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			} else if (sort === 'name-z') {
				sortedProducts = sortedProducts.sort((a, b) =>
					b.name.localeCompare(a.name)
				);
			} else console.log('no matching sort type');
			// ---------- ------------ ----------
			return { ...state, filtered_products: sortedProducts };
		case UPDATE_FILTERS:
			const { name, value } = action.payload;
			return {
				...state,
				filters: {
					...state.filters,
					[name]: value,
				},
			};
		case FILTER_PRODUCTS:
			const {
				all_products,
				filters: { text, category, company, color, price, shipping },
			} = state;
			let filtered = [...all_products]; // reset template
			// --------- filter functions --------------
			if (text) {
				filtered = filtered.filter(item =>
					item.name.toLowerCase().startsWith(text)
				);
			}
			if (category !== 'all') {
				filtered = filtered.filter(item => item.category === category);
			}
			if (company !== 'all') {
				filtered = filtered.filter(item => item.company === company);
			}
			if (color !== 'all') {
				filtered = filtered.filter(item => {
					return item.colors.find(c => c === color);
				});
			}
			if (price) {
				filtered = filtered.filter(item => item.price <= price);
			}
			if (shipping) {
				filtered = filtered.filter(item => item.shipping);
			}
			// -----------------------------------------
			return { ...state, filtered_products: filtered };
		case CLEAR_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					text: '', // reset all
					color: 'all',
					company: 'all',
					category: 'all',
					price: state.filters.max_price,
					free_shipping: false,
				},
			};
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;

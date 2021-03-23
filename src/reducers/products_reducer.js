import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

// --------------- REDUCER ------------------

const products_reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		// --- SIDEBAR ----
		case SIDEBAR_OPEN:
			return { ...state, isSidebarOpen: true };
		case SIDEBAR_CLOSE:
			return { ...state, isSidebarOpen: false };

		// --- FETCH ---
		case GET_PRODUCTS_BEGIN:
			return { ...state, products_loading: true };
		case GET_PRODUCTS_SUCCESS:
			// filter featured
			const featured_products = action.payload.products.filter(product => {
				return product.featured === true;
			});
			return {
				...state,
				products_loading: false, //reset loading
				products: [...action.payload.products],
				featured_products,
			};
		// fetch single
		case GET_SINGLE_PRODUCT_BEGIN:
			return {
				...state,
				single_product_loading: true,
				single_product_error: false,
			};
		case GET_SINGLE_PRODUCT_SUCCESS:
			return {
				...state,
				single_product_loading: false, //reset loading
				single_product: action.payload.singleProduct,
			};

		//  --- ERRORS ---
		case GET_PRODUCTS_ERROR:
			return { ...state, products_loading: false, products_error: true };
		case GET_SINGLE_PRODUCT_ERROR:
			return {
				...state,
				single_product_loading: false,
				single_product_error: true,
			};

		default:
			throw new Error(`WRONG ACTION TYPE: ${action.type}`);
	}
	return state;
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;

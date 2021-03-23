import React, { useEffect, useContext, useReducer } from 'react';

import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';
import reducer from '../reducers/filter_reducer';
import { useProductsContext } from './products_context';

// ------ STATE ------
const initialState = {
	all_products: [],
	filtered_products: [],
	grid_view: false,
	sort: 'name-a',
	filters: {
		text: '',
		color: 'all',
		company: 'all',
		category: 'all',
		min_price: 0,
		max_price: 0,
		price: 0,
		free_shipping: false,
	},
};

// ------ CONTEXT ------
const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// set filter context from products context after products fetch
	const { products } = useProductsContext();
	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: { products } });
	}, [products]);

	// --- set view ---
	const setGridView = () => dispatch({ type: SET_GRIDVIEW });
	const setListView = () => dispatch({ type: SET_LISTVIEW });

	// --- sort ---
	const updateSort = e => {
		const { value } = e.target;
		dispatch({ type: UPDATE_SORT, payload: { value } });
	};
	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [products, state.sort, state.filters]);

	// --- filter ---
	const updateFilters = e => {
		// errors???
		let {
			name,
			value,
			textContent,
			checked,
			dataset: { color },
		} = e.target;
		if (name === 'category') value = textContent;
		else if (name === 'color') value = color;
		else if (name === 'price') value = Number(value);
		else if (name === 'free_shipping') value = checked;
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const clearFilters = () => dispatch({ type: CLEAR_FILTERS });

	// --- provider ---
	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
				clearFilters,
			}}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};

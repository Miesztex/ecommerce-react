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

	return (
		<FilterContext.Provider value={{ ...state }}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};

import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { useProductsContext } from '../context/products_context';
import GridView from './GridView';
import ListView from './ListView';
import { Loading, Error } from '../components';

const ProductList = () => {
	const { filtered_products: products, grid_view } = useFilterContext();
	if (products.length < 1) {
		return (
			<h4 style={{ textTransform: 'none' }}>Sorry, no products match...</h4>
		);
	}
	if (!grid_view) {
		return <ListView products={products} />;
	}
	return <GridView products={products} />;
};

export default ProductList;

export const formatPrice = price => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price / 100);
};

export const getUniqueValues = (data, type) => {
	let unique = data.map(item => item[type]);
	if (type === 'colors') unique = unique.flat(); // spreads nested arrays
	// item.key(type) -> [value1, value1, value2]
	return ['all', ...new Set(unique)];
};

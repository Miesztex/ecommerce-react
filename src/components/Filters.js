import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
	const {
		filters: {
			text,
			category,
			company,
			price,
			min_price,
			max_price,
			free_shipping,
			color,
		},
		updateFilters,
		clearFilters,
		all_products,
	} = useFilterContext();

	// unique values
	const categories = getUniqueValues(all_products, 'category');
	const colors = getUniqueValues(all_products, 'colors');
	const companies = getUniqueValues(all_products, 'company');
	return (
		<Wrapper>
			<div className='content'>
				<form onSubmit={e => e.preventDefault()}>
					{/* --- search --- */}
					<div className='form-control'>
						<input
							type='text'
							name='text'
							placeholder='search over here'
							className='search-input'
							value={text}
							onChange={updateFilters}
						/>
					</div>
					{/* --- categories --- */}
					<div className='form-control'>
						<h5>category</h5>
						{categories.map((cat, idx) => {
							return (
								<button
									key={idx}
									name='category'
									className={`${category === cat.toLowerCase() && 'active'}`}
									onClick={updateFilters}>
									{cat}
								</button>
							);
						})}
					</div>
					{/*  --- companies --- */}
					<div className='form-control'>
						<h5>company</h5>
						<select
							name='company'
							className='company'
							value={company}
							onChange={updateFilters}>
							{companies.map((comp, idx) => (
								<option key={idx} value={comp}>
									{comp}
								</option>
							))}
						</select>
					</div>
					{/* --- colors --- */}
					<div className='form-control'>
						<h5>Colors</h5>
						<div className='colors'>
							{colors.map((c, idx) => {
								if (c === 'all')
									return (
										<button
											key={idx}
											name='color'
											data-color='all'
											className={`${color === 'all' && 'active'} all-btn`}
											onClick={updateFilters}>
											all
										</button>
									);
								return (
									<button
										key={idx}
										name='color'
										data-color={c}
										className={`${color === c && 'active'} color-btn`}
										onClick={updateFilters}
										style={{
											background: c,
										}}>
										{color === c && <FaCheck />}
									</button>
								);
							})}
						</div>
					</div>
					{/* --- price --- */}
					<div className='form-control'>
						<h5>Max price</h5>
						<p className='price'>{formatPrice(price)}</p>
						<input
							type='range'
							name='price'
							onChange={updateFilters}
							min={min_price}
							max={max_price}
							value={price}
						/>
					</div>
					{/* --- shipping --- */}
					<div className='form-control shipping'>
						<label htmlFor='free_shipping'>free shipping</label>
						<input
							type='checkbox'
							name='free_shipping'
							id='free_shipping'
							onChange={updateFilters}
							checked={free_shipping}
						/>
					</div>
				</form>
			</div>
			<button className='clear-btn' onClick={clearFilters}>
				clear filters
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

export default Filters;

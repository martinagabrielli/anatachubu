import React, { useState } from 'react';
import styles from './searchbar.module.scss';

export default function SearchBar({ onSearch }) {
	const [query, setQuery] = useState('');

	const handleInputChange = e => {
		setQuery(e.target.value);
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form className={styles.searchBar} onSubmit={handleFormSubmit}>
			<input
				type="search"
				value={query}
				onChange={handleInputChange}
				placeholder="Search..."
				aria-label="Search"
			/>
			<button className={styles.searchBar__button} type="submit"><div></div></button>
		</form>
	);
}

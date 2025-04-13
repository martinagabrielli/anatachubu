import React, { useState } from 'react';
import styles from './searchbar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <form className={styles.searchBar}>
      <input
        type="search"
        value={input}
        onChange={handleInputChange}
        placeholder="Search..."
        aria-label="Search"
      />
      <button className={styles.searchBar__button} type="submit"><div></div></button>
    </form>
  );
}
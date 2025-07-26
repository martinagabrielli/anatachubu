import React, { useState } from 'react';
import styles from './searchbar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <form className={`${styles.searchBar} ${className}`}>
      <div className={`${styles.searchBar__inner}`}>
        <input
          type="search"
          value={input}
          onChange={handleInputChange}
          placeholder="Search..."
          aria-label="Search"
        />
        <button className={styles.searchBar__button} type="submit"><div></div></button>
      </div>
    </form>
  );
}
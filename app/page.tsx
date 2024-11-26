'use client';
import Header from './components/Header/Header';
import SearchBanner from './components/SearchBanner/SearchBanner';

export default function Home() {
  return (
    <div className="home">
      <Header />
      <SearchBanner />
    </div>
  );
}

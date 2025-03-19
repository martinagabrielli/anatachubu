import styles from './searchbanner.module.scss';

export default function SearchBanner() {
  return (
    <div className={styles.searchBanner}>
      <h3 className={styles.searchBanner__heading}>Try searching to get starded</h3>
      <p className="body-1 grey-1">Start watching videos to enjoy yourself.</p>
    </div>
  )
}

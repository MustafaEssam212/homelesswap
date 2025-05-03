import styles from './style.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Heading, Text, Link, useMatchBreakpoints, OpenNewIcon } from '@pancakeswap/uikit'

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 15,
            page: 1,
            sparkline: false,
          },
        });

        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
<>
    <Heading mb="20px" scale="xl" color="white">
    Trending Coins
    </Heading>

    <div className={styles.tableContainer}>





    <table className={styles.table}>
      <thead>
        <tr>
        <th className={styles.th}>Name</th>
          <th className={styles.th}>Symbol</th>
         
          <th className={styles.th}>Image</th>
          <th className={styles.th}>Current Price (usd)</th>
          <th className={styles.th}>Market Cap (usd)</th>
          <th className={styles.th}>Percent Change 24h</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((coin) => (
          <tr key={coin.id}>
             <td className={styles.td}>{coin.name}</td>
            <td className={styles.td} >
              {coin.symbol}
            </td>
           
            <td className={styles.td}><img src={coin.image} alt={coin.name} style={{ width: '30px', height: '30px' }} /></td>
            <td className={styles.td}>{coin.current_price}</td>
            <td className={styles.td}>{coin.market_cap}</td>
            <td className={`${styles.td} ${coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}`}>
              {coin.price_change_percentage_24h.toFixed(5)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
  );
};

export default CryptoTable;
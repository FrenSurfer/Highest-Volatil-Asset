const fetch = require('node-fetch');

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
fetch(url)
  .then(res => res.json())
  .then(data => {
    const coins = data;
    coins.sort((a, b) => {
      const currentPriceA = a.current_price;
      const currentPriceB = b.current_price;
      const priceDiffA = Math.abs(a.price_change_24h);
      const priceDiffB = Math.abs(b.price_change_24h);
      const volatilityA = priceDiffA / currentPriceA * 100;
      const volatilityB = priceDiffB / currentPriceB * 100;
      return volatilityB - volatilityA;
    });

    // sélectionnez l'élément HTML dans lequel vous voulez afficher les données
    const coinsList = document.getElementById('coins-list');

    // créer un élément pour chaque pièce et ajouter les données
    for (let i = 0; i < 5; i++) {
      const coin = coins[i];
      const currentPrice = coin.current_price;
      const priceDiff = (coin.price_change_24h);
      const volatility = priceDiff / currentPrice * 100;

      // créer un élément pour chaque pièce
      const coinElement = document.createElement('div');
      coinElement.classList.add('coin');

      // ajouter les données à l'élément de pièce
      const nameElement = document.createElement('h2');
      nameElement.textContent = `${i + 1}. ${coin.name} (${coin.symbol})`;
      coinElement.appendChild(nameElement);

      const currentPriceElement = document.createElement('p');
      currentPriceElement.textContent = `Current price: $${currentPrice.toFixed(2)}`;
      coinElement.appendChild(currentPriceElement);

      const priceDiffElement = document.createElement('p');
      priceDiffElement.textContent = `Price difference (24h): $${priceDiff.toFixed(2)}`;
      coinElement.appendChild(priceDiffElement);

      const volatilityElement = document.createElement('p');
      volatilityElement.textContent = `Volatility (24h): ${volatility.toFixed(2)}%`;
      coinElement.appendChild(volatilityElement);

      // ajouter l'élément de pièce à la liste des pièces
      coinsList.appendChild(coinElement);
    }
  })
  .catch(err => console.error(err));

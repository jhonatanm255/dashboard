


const toggleButton = document.getElementById('toggle-mode');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

    const btnHamburguesa = document.getElementById('btn-h');
    const aside = document.querySelector('.light-mode'); 


    btnHamburguesa.addEventListener('click', () => {
        aside.classList.toggle('active-menu');
    });


// ENDPOINT PARA EL PRECIO DE LAS CRIPTOS
function createSocket(symbol, isDarkMode) {
    const tradeSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
    const tickerSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
    const stockPriceElement = document.getElementById(`${symbol.toLowerCase()}-price`);
    const volumenSpan = document.getElementById(`${symbol.toLowerCase()}-volumen`);
    let lastPrice = null;

    // Manejar eventos para la conexión WebSocket de trades
    tradeSocket.onmessage = (event) => {
        const stockObject = JSON.parse(event.data);
        const price = parseFloat(stockObject.p).toFixed(2);
        stockPriceElement.innerText = `Price: ${price} $`;
        lastPrice = price;
    };

    // Manejar eventos para la conexión WebSocket de ticker
    tickerSocket.onmessage = (event) => {
        const tickerData = JSON.parse(event.data);
        const volumeChange = parseFloat(tickerData.P);
        volumenSpan.innerHTML = `<span style="color: ${isDarkMode ? 'white' : 'black'};">Vol 24h:</span> ${volumeChange} %`;
        volumenSpan.style.color = volumeChange > 0 ? (isDarkMode ? 'white' : 'green') : (volumeChange < 0 ? (isDarkMode ? 'white' : 'red') : '');
    };

    return { tradeSocket, tickerSocket };
}

// Lista de criptomonedas que deseas seguir
const cryptoSymbols = ['ethusdt', 'btcusdt', 'adausdt', 'dotusdt', 'bnbusdt', 'solusdt','ltcusdt', 'avaxusdt'];

// Objeto para almacenar todas las conexiones WebSocket
const cryptoSockets = {};

// Crear conexiones para cada criptomoneda
cryptoSymbols.forEach(symbol => {
    cryptoSockets[symbol] = createSocket(symbol);
});

  // DATOS ECONOMICOS DE CHILE
  fetch("https://mindicador.cl/api")
  .then(function (response) {
    return response.json();
  })
  .then(function (dailyIndicators) {
    document.getElementById("UF").innerHTML =
      "$ " + dailyIndicators.uf.valor;

    document.getElementById("UTM").innerHTML =
      "$ " + dailyIndicators.utm.valor;

      document.getElementById("IPC").innerHTML = 
      '' + dailyIndicators.ipc.valor + ' %';
      
      document.getElementById("DolarO").innerHTML = 
      '$ ' + dailyIndicators.dolar.valor;

      document.getElementById("Euro").innerHTML = 
      '$ ' + dailyIndicators.euro.valor;

      document.getElementById("Imacec").innerHTML = 
      '' + dailyIndicators.imacec.valor + ' %';
  })
  .catch(function (error) {
    console.log("Requestfailed", error);
  });

// tradingview-widget.js

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('tradingview-widget-container');

  if (container) {
    const isDarkMode = container.classList.contains('light-mode');

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["Apple", "AAPL|1D"],
        ["Google", "GOOGL|1D"],
        ["Microsoft", "MSFT|1D"],
        ["Tesla", "TSLA|1D"],
        ["Meta", "META|1D"],
        ["Amazon", "AMZN|1D"],
        ["Netflix", "NFLX|1D"]
      ],
      "chartOnly": false,
      "width": "auto",
      "height": 400,
      "locale": "en",
      "colorTheme": isDarkMode ? "light" : "dark",
      // Otras configuraciones...
      
    });

    container.appendChild(script);
  }
});

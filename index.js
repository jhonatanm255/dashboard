

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

 let ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
 let stockPriceElement = document.getElementById('stock-price')
 let lastPrice = null;


ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(2);
    stockPriceElement.innerText = price
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
    lastPrice = price;
};


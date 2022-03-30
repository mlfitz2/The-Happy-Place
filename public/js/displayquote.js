const quoteEl = document.querySelector('#quote');
const authorEl = document.querySelector('#author')


function displayQuotes() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = randomQuote.text;
    authorEl.textContent = randomQuote.author;
    console.log('success')
}


window.addEventListener("load", displayQuotes)

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitwerBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




let apiQuotes = [];

//Show that we are loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array.
    let quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    //Check if auther field is blank and replace it with quote unknown
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }

    //Check the quote length to determine the styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Set the quote, and hide the loader;
    quoteText.textContent = quote.text;
    complete();
}
// Get quotes from an API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch the error
    }
}
//Tweet the quote
function tweetQuote() {
    let q = `"${quoteText.textContent}"`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${q} ~ ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); //The _blank allows it to open in a new tab
}

//Event Listerners
newQuoteBtn.addEventListener('click', newQuote);
twitwerBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();

/*
Skills rainforced by this project:

1. DOM and DOM manipulation:
The use of javaScript to change web content dynamically. For this project, it wasn't just about showing different random quotes; but also, changing the background after every 60 seconds (TO BE IMPLIMENTED: In my javaScript file, I would have an array of background URLs. Then, I would write a function that finds the next background. First, the function has to grab the body element from html and store in a variable called "body". Then loop through the array of backgrounds and set the body.style background to each background after specified seconds). 

2. Ability to fetch data from an API
Programming is not just about writing code from scratch; sometimes, we have to leverage an existing code or data to build our own. I was able to make use of Hero Patterns's beautiful background images. https://www.heropatterns.com.

I also took advantage of Google Fonts, a collection of fonts and icons which are free and open source. 

With the help of these awesome APIs, I was able to channel all my effort to the logic of my project.

*/

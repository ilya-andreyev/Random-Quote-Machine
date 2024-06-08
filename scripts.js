const endpoint =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const colorArray = [
  "#f2a365",
  "#222831",
  "#30475e",
  "#202040",
  "#543864",
  "#ff6363",
  "#ffbd69",
  "#54123b",
  "#84142d",
  "#c02739",
  "#29c7ac",
  "#b030b0",
  "#ff0000",
  "#ffd700",
  "#b55400",
  "#a7d129",
  "#000000",
  "#f6c90e",
  "#220e24",
];

const rootElement = document.documentElement;
const body = rootElement.querySelector("body");
const quoteWindow = body.querySelector(".quote-machine");
const quoteWrap = quoteWindow.querySelector(".quote-wrap");
const quoteHTML = quoteWrap.querySelector(".quote");
const authorHTML = quoteWrap.querySelector(".author");
const quoteControl = document.querySelectorAll(".quote-control > *");
const newQuoteButton = document.querySelector(".new__quote");
const twitterShareLink = document.querySelector(".twitter");
const tumblrShareLink = document.querySelector(".tumblr");

const randomElement = (arr) => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
};

let prevQuote;
let prevColor;

const init = ({ quotes }) => {
  const randomQuote = () => {
    const { quote, author } = randomElement(quotes);
    const color = randomElement(colorArray);
    if (quote === prevQuote || color === prevColor) {
      return randomQuote();
    }
    prevQuote = quote;
    prevColor = color;
    quoteWrap.classList.remove("open");
    setTimeout(() => {
      quoteHTML.textContent = quote;
      authorHTML.textContent = `- ${author}`;
      quoteWindow.style.setProperty("color", color);
      quoteWrap.classList.add("open");
    }, 400);
    rootElement.style.setProperty("--main-bg", color);
    const hrefTwitter = `https://twitter.com/intent/tweet?hashtags=quotes&text="${encodeURIComponent(
      quote
    )}" ${encodeURIComponent(author)}`;
    const hrefTumblr = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
      author
    )}&content=${encodeURIComponent(
      quote
    )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    twitterShareLink.setAttribute("href", hrefTwitter);
    tumblrShareLink.setAttribute("href", hrefTumblr);
  };
  randomQuote();
  newQuoteButton.addEventListener("click", randomQuote);
};

fetch(endpoint)
  .then((blob) => blob.json())
  .then(init);

// to manuplate dom we need to make const for each element we want to manuplate
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader= document.getElementById('loader');

// show loading spineer
function loading() {
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hide loading spinner
function complete(){
    if(!loader.hidden){
    quoteContainer.hidden=false;
    loader.hidden = true;
}
}
// get quote from api
async function getQuote() {
    loading();
// set proxy to avoid url when running on your local host. below is a free proxy we can make our own proxy as well. we are calling proxy first and than api to avoid any error
 const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
 const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
//  first it will fetch the result and next will response into json format to show it
 try{
  const response = await fetch (proxyUrl + apiUrl);
  const data= await response.json();
//   if author is blank add unknown
 if(data.quoteAuthor===''){
     authorText.innerText='unknown';
 }else{
     authorText.innerText=data.quoteAuthor;
 }
 //reduce long quote size
 if(data.quoteText.lenght>120){
     quoteText.classList.add('long-quote');
 } else{
     quoteText.classList.remove('long-quote');
}
  quoteText.innerText= data.quoteText;

// stop Loader,Show quote
complete();
//when we use free api sometime it doesnt show to result its better to set error msg.
 }
 catch(error) {
   getQuote();
 }
}
// make twitter content by using twitter dev
function tweetQuote(){
    const quote =quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} -${author}` ;
    window.open(twitterUrl,'_blank');
}
// add event listner to twitter button
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// on Load 
getQuote();


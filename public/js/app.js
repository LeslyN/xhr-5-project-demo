// document.addEventListener('load', function() {
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });

  function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ad72b2701f9d46ae8838cc299b8c77a1`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  const article = data.response.docs[0];
  console.log(article);
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  // li.innerHTML = ``;
  li.innerText = snippet;

  responseContainer.appendChild(li);
  // const response = data.response;
  // console.log(data);
  // console.log(response);
}

// });

const btn = document.querySelector("button");
const priceSpan = document.querySelector("#price");
 let currency = 'EUR'; 
const uri = 'https://api.coindesk.com/v1/bpi/currentprice.json';
btn.addEventListener('click', function(){
     fetch(uri)
     .then(function(response){
         console.log(response);
         return response.json()
     }).then(function(data){
        console.log(data.bpi[currency].rate);
        priceSpan.innerText = data.bpi[currency].rate + currency ;
    })
     .catch(function(error){
         console.log(error);
     }) 
  /*   fetch(url)
     .then(function(response){
         console.log(response);
         return response.json().then(function(data){
             console.log(data);
         })
     })
     .catch(function(error){
         console.log(error);
     }) */
})
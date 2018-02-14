/* Variables del método XHR*/ 
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;
  
/* Variables del método fetch*/ 
const btn = document.getElementById('search-fetch-form');
const searchFetchKeyword = document.getElementById('search-fetch-keyword');
const responseFetchContainer = document.getElementById('response-fetch-container'); 
let searchedForTextFetch;
const url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForTextFetch}&api-key=ad72b2701f9d46ae8838cc299b8c77a1`;
  
  
/* Método XHR */ 
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
}

/* Método fetch */ 
btn.addEventListener('submit', function(e){
  e.preventDefault();
  responseFetchContainer.innerHTML = '';
  searchedForTextFetch = searchFetchKeyword.value;
    fetch(url)
    .then(function(response){
      console.log(response);
      return response.json()
    }).then(function(data){
      // debugger;
      console.log(data.response);
      const articleFetch = data.response.docs[0];
      console.log(articleFetch);
      const titleFetch = articleFetch.headline.main;
      const snippetFetch = articleFetch.snippet;

      let li = document.createElement('li');
      li.className = 'articleClass';
      // li.innerHTML = ``;
      li.innerText = snippetFetch;
      responseFetchContainer.appendChild(li);
  })
  .catch(function(error){
    console.log(error);
  }) 
})
const API_BASE_URL = 'https://dummyjson.com/quotes'
const skipId = 0 ;
const total = 0;
const fetchingQuotes = true;

const quotesContainer = document.querySelector('.qoutes-container')


function handleScroll(){
    // console.log("scrolling")
    const yetToBeScrolled = (
        this.scrollHeight -
        this.clientHeight - 
        this.scrollTop
    )


    if(yetToBeScrolled === 0){
        console.log("no more scrolling")
        fetchQuotes();
    }
}

function createQoute(qouteData, author){
    const qouteContainer = document.createElement('div');
    qouteContainer.setAttribute('class','qoute');
    const paraTag = document.createElement('p');
    paraTag.innerText = qouteData;
    const spanTag = document.createElement('span');
    spanTag.innerText = `~ ${author}`;
    qouteContainer.appendChild(paraTag);    
    qouteContainer.appendChild(spanTag);
    return qouteContainer ;
}

async function fetchQuotes(){
    if(!fetchingQuotes) return ;
    const url = createUrl(API_BASE_URL);
    const data = await fetch(url);
    const json = await data.json();
    const allQuotes = json.quotes;
    console.log(json)
    const fragment = document.createDocumentFragment();
    allQuotes.map(data => {
       fragment.appendChild(createQoute(data.quote, data.author));
    })

    quotesContainer.appendChild(fragment)
    
    const lastQuote = allQuotes[allQuotes.length - 1].id;
    const total = json.total;
    if(lastQuote === total){
        quotesContainer.removeEventListener('scroll', handleScroll);
    }
  
    fetchingQuotes = true;
}


function createUrl(API){
    const url = new URL(API);
    url.searchParams.set('limit', '10');
    url.searchParams.set('skip','0')
    return url;
}

fetchQuotes();


quotesContainer.addEventListener('scroll', handleScroll);
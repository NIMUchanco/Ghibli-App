console.log('film.js is loaded');

const film_url = "https://ghibliapi.vercel.app/films/";

//Films url
const getFilm = async (film_url) => {
    const response = await fetch(film_url);
    const data = await response.json();
    displayFilm(data);
}

const displayFilm = async (data) => {
    main.innerHTML = '';

    //HTML elements
    let section = document.createElement('section');
    let h1 = document.createElement('h1');
    let a = document.createElement('a');
    a.href = "#";
    a.id = 'btn';
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');

    //append elements
    main.append(section);
    section.append(h1, a, img, h2, p);
    
    //HTML code
    h1.innerHTML = 'Film';
    a.innerHTML = 'Random';

    //Random display
    function randomFunc(array) { 
        let random = Math.floor(Math.random() * (data.length));
        img.src = data[random].image;
        h2.innerHTML = data[random].title;
        p.innerHTML = `${data[random].description}<br>
            Released in ${data[random].release_date}.<br>
            Directed by ${data[random].director}.`;
    }

    randomFunc(data);

    let refresh = document.querySelector('#btn');
    refresh.addEventListener('click', () => { 
        // getFilm(film_url);
        randomFunc(data);
    })
}

const byFilm = document.querySelector('#by-film');

byFilm.addEventListener('click', (event)=>{
    event.preventDefault();
    getFilm(film_url);
});
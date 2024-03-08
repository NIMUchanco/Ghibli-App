console.log('home.js is loaded');

const url = "https://ghibliapi.vercel.app/films/";
const charac_url = "https://ghibliapi.vercel.app/people/";

//Film url
const getHome = async (url, charac_url) => {
    let response = await fetch(url);
    const data = await response.json();
    response = await fetch(charac_url);
    const charaData = await response.json();
    displayHome(data, charaData);
}

const main = document.querySelector('main');

const displayHome = async (data, charaData) => {
    //HTML elements
    let section = document.createElement('section');
    let h1 = document.createElement('h1');
    let h3 = document.createElement('h3');
    let searchBar = document.createElement('div');
    searchBar.classList.add('search-bar');
    let input = document.createElement('input');
    input.setAttribute('placeholder', 'Find film or character');
    input.setAttribute('spellcheck', 'false');
    let xBtn = document.createElement('div');
    xBtn.classList.add('x-btn');
    let span = document.createElement('span');
    let btn = document.createElement('button');
    let btnIcon = document.createElement('img');
    btnIcon.id = 'search-icon';
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    
    //For search result
    let chara_section = document.createElement('section');
    chara_section.id = 'section2';
    let chara_img = document.createElement('img');
    let chara_h2 = document.createElement('h2');
    let chara_p = document.createElement('p');

    main.innerHTML = '';

    //append elements
    main.append(section);
    section.append(h1, h3, searchBar, img, h2, p);
    searchBar.append(input, xBtn, btn);
    xBtn.append(span);
    btn.append(btnIcon);
    
    //HTML code
    h1.innerHTML = 'Ghibli API';
    h3.innerHTML = '- Maiko Matsuoka -';
    span.innerHTML = 'x';
    btnIcon.src = 'images/loupe2.png';

    //Random variable
    let random = Math.floor(Math.random() * (data.length));
    img.src = data[random].image;
    h2.innerHTML = data[random].title;
    p.innerHTML = `${data[random].description}<br>
            Released in ${data[random].release_date}.<br>
            Directed by ${data[random].director}.`;

    //Search btn
    const inputField = document.querySelector('input');
    const searchBtn = document.querySelector('button');

    // X btn
    xBtn.addEventListener('click', () => {
        input.value = '';
        span.style.display = 'none';
    })

    inputField.addEventListener('input', () => {
        if (inputField.value.length > 0) {
            span.style.display = 'block';
        } else { 
            span.style.display = 'none';
        }
    })

    // hit Enter
    inputField.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) { // Enter key code
            searchBtn.click();
        }
    });

    // search btn
    searchBtn.addEventListener('click', async () => {
        const search = input.value.trim().toLowerCase();

        if (search == '') { 
            return;
        }

        let foundFilm = '';
        let foundChara = '';

        chara_img.remove();
        chara_h2.remove();
        chara_p.remove();

        img.src = '';
        h2.innerHTML = '';
        p.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            if (data[i].title.toLowerCase().includes(search)) {
                console.log(data[i]);
                foundFilm = data[i];
                break;
            }
        }

        let j = 0
        for (j = 0; j < charaData.length; j++) {
            if (charaData[j].name.toLowerCase().includes(search)) {
                foundChara = charaData[j];
                break;
            }
        }

        if (foundFilm) {
            img.src = foundFilm.image;
            h2.innerHTML = foundFilm.title;
            p.innerHTML = `${foundFilm.description}<br>
            Released in ${foundFilm.release_date}.<br>
            Directed by ${foundFilm.director}.`;
        }

        if (foundChara) {
            let film_response = '';

            if (foundChara.films.length > 1) {
                film_response = await fetch(foundChara.films[1]);
            } else { 
                film_response = await fetch(foundChara.films[0]);
            }

            let film_data = await film_response.json();

            main.append(chara_section);
            chara_section.append(chara_img, chara_h2, chara_p);

            chara_img.src = `images/${j}.jpg`;
            chara_h2.innerHTML = foundChara.name;
            chara_p.innerHTML = `The character is from ${film_data.title}.<br>
            Age: ${foundChara.age}<br>
            Gender: ${foundChara.gender}<br>
            Eye color: ${foundChara.eye_color}<br>
            Hair color: ${foundChara.hair_color}`;
        }

        if (!foundFilm && !foundChara){
            img.src = '';
            h2.innerHTML = 'Not found';
            p.innerHTML = '';
        }
    })
}

getHome(url, charac_url);
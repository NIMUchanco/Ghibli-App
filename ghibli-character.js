console.log('character.js is loaded');

const character_url = "https://ghibliapi.vercel.app/people/";

//Character url
async function getCharacter(character_url) {
    const response = await fetch(character_url);
    const data = await response.json();
    displayChara(data);
}

async function displayChara(data) {
    main.innerHTML = '';

    //HTML elements
    let section = document.createElement('section');
    let h1 = document.createElement('h1');
    let a = document.createElement('a');
    a.href = "#";
    a.id = 'btn';
    let img = document.createElement('img');
    img.classList.add('chara-img');
    let h2 = document.createElement('h2');
    h2.classList.add('chara-h2');
    let p = document.createElement('p');
    p.classList.add('chara-p');

    main.append(section);
    section.append(h1, a, img, h2, p);

    //HTML code
    h1.innerHTML = 'Character';
    a.innerHTML = 'Random';

    //Fetch
    let random = Math.floor(Math.random() * (data.length));
    let film_response = await fetch(data[random].films);
    let film_data = await film_response.json();

    //Random display
    async function randomFunc(array) {
        random = Math.floor(Math.random() * (data.length));
        film_response = await fetch(data[random].films);
        film_data = await film_response.json();
        img.src = `images/${random}.jpg`;
        h2.innerHTML = data[random].name;
        p.innerHTML = `The character is from ${film_data.title}.<br>
        Age: ${data[random].age}<br>
        Gender: ${data[random].gender}<br>
        Eye color: ${data[random].eye_color}<br>
        Hair color: ${data[random].hair_color}`;
    }

    randomFunc(data);

    let refresh = document.querySelector('#btn');
    refresh.addEventListener('click', () => { 
        randomFunc(data);
    })
}

const byCharacter = document.querySelector('#by-character');

byCharacter.addEventListener('click', async (event)=>{
    event.preventDefault();
    getCharacter(character_url);
});
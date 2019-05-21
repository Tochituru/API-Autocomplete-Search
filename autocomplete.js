// 1. en el input agrego el onkeyup + un console log (clog)
// 2. obtener lo que escribimos en el input
// 3. generarme la URL
// 4. fetch() - devuelve la promise
// 4.1. res.json()
// 4.2. hacer un for por todas las peliculas
// 4.3. por cada peli que estamos iterando creamos un LI

const input = document.querySelector('#autocomplete-input');
// document.getElementById('autocomplete-input').onkeyup = function() {}; 
//asi lo hizo Eze. Esta es una forma más específica porque solo se agrega al evento al elemento con esa id.
// de esta forma yo le indico a JS que elementos con determinada clase o selector los escuche, no es especifico
// se enfoca en un elemento unico

// document.addEventListener('keyup', function() {});
// esta es una forma de que busque en todos los elementos (de todo el documento, cada vez que se suelte una tecla en cualquier elemento)
// generalmente es para cosas DINAMICAS (lo vamos a usar para completar el input cuando hago click en los LI por ej)


input.onkeyup = function () {
   console.log('key up:', input.value);
   // con el value del input hago el fetch

   const movieName = input.value.toLowerCase(); 
   // creo mi var antes de la url para que pueda reconocerla
   const url = `https://api.themoviedb.org/3/search/movie?api_key=a70dbfe19b800809dfdd3e89e8532c9e&query=${movieName}`;
   const ul = document.querySelector('ul#autocomplete-results');

   if (movieName) {

       fetch(url)
           .then(res => /* return */ res.json())
           .then(data => { 
               // las arrow functions siempre son anonimas, por eso para llamarla con un nombre, deberia ponerla adentro de otra funcion
               console.log(movieName);
               let lis = '';
               let movies = data.results;

               for (let i = 0; i < movies.length; i++) {
                   const movie = movies[i]; 
                   // meter esto en una funcion fun claro, ahre
                   lis +=
                       // deberia crear una variable li (sacar mi acumulador) con mi literals y poner directamente ul.innerHTML = li +=;
                       // o BUENO LYM un map que esta abajo ajajaj
                       `<li>
               <p>${movie.title}</p>
           </li>`
                   console.log(lis);
               }
               ul.innerHTML = lis;
               // agarramos UL y le removemos el display none
               ul.style.display = 'block'; // elemento + style + propiedad + valor nuevo

               // forEach es simplemente una forma de iterar, en vez de hacerlo con un for lo hacemos con el metodo, y es mas declarativo
               // forEach movie, hace algo
               // el map tamb itera, pero convierte las cosas en un listado, me vuelve la misma cantidad de elementos que tengo al principio
               // se hace sobre el array y le paso una funcion que recibe por parametro cada elemento que va iterando

               // movie.map(function(movie) { return `<li> <p>${movie.title}</p> </li>` })
               // ul.innerHTML = losLisDeLasPelis.join(''); // que me uno los elementos sacandome la coma, porque map es tramboliko
               // ul.style.diplay = 'block';

               //o mas TRAMBOLIKO
               // ul.innerHMTL = movie.map(function(movie) => `<li> <p>${movie.title}</p> </li>` }).join('');
               // AHREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

           }) // cierro mi arrow function
   }
   else {
       ul.style.display = 'none';
   }

};
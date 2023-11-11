let genres = [
  {
    id: 28,
    name: "Ação",
  },
  {
    id: 12,
    name: "Aventura",
  },
  {
    id: 16,
    name: "Animação",
  },
  {
    id: 35,
    name: "Comédia",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentário",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Família",
  },
  {
    id: 14,
    name: "Fantasia",
  },
  {
    id: 36,
    name: "História",
  },
  {
    id: 27,
    name: "Terror",
  },
  {
    id: 10402,
    name: "Música",
  },
  {
    id: 9648,
    name: "Mistério",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Ficção científica",
  },
  {
    id: 10770,
    name: "Cinema TV",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "Guerra",
  },
  {
    id: 37,
    name: "Faroeste",
  },
];

function buscar() {
  let campoPesquisa = window.document.getElementById("search-bar");
  let valorCampoPesquisa = campoPesquisa.value;
  console.log(valorCampoPesquisa);
  let title = window.document.getElementById("title");
  let vote_average = window.document.getElementById("vote_average");
  let genre = window.document.getElementById("genre");
  let release_date = window.document.getElementById("release_date");
  let overview = window.document.getElementById("overview");
  let imagemFilme = window.document.getElementById("imagem");
  let divRepetida = window.document.getElementById("divRepetida");

  let filmesBuscados = [];
  let imagemURL = "https://image.tmdb.org/t/p/w500";

  divRepetida.innerHTML = ""

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGY1YzYwMzA0MzhjY2NjMTA3MGNiOTI1YzAyODBlYSIsInN1YiI6IjY1NGJkZjA4YjE4ZjMyMDBlMmNmNDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.POF3PJoF_ufJ3RKW7A_ZHp8d4nvp6jzuIL6qLFIfQdU",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${valorCampoPesquisa}&include_adult=false&language=pt-br&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      filmesBuscados = response.results;
      filmesBuscados.forEach((filme) => {
        //Configurando os gêneros
        let generoInicial = filme.genre_ids; // retorna id: 12, 18
        let lista2 = generoInicial.map(function (i) {
          // i= 12 && i= 18
          let oi = genres.filter(function (objeto) {
            // na 2 volta o objeto vai ser {id: 12}
            return i == objeto.id;
          });
          console.log(oi);
          return oi[0].name;
        });
        // Criando novas DIVs
        let novaDiv = window.document.createElement("div");
        novaDiv.classList.add("card");
        let dataInicial = filme.release_date.split("-"); //transforma string em array
        let dataInvertida = `${dataInicial[2]}-${dataInicial[1]}-${dataInicial[0]}`;
        //innerhtml passa tudo, tanto elemento quanto classe
        novaDiv.innerHTML = `\
        <div class="card-body d-flex gap-3">\
        <img src="${
          imagemURL + filme.poster_path
        }" class="card-img-start w-25" alt="${filme.title}" id="imagem"/>\
        <div id="texto">\
          <h4 class="card-title" id="title">${filme.title}</h4>\
          <h5 class="card-subtitle mb-2 text-body-secondary" id="vote_average">Nota do Público:   ${filme.vote_average.toFixed(
            1
          )}</h5>\
          <h5 class="card-subtitle mb-2 text-body-secondary" id="genre">Gênero: ${lista2[0]}, ${lista2[1]}</h5>\
          <h5 class="card-subtitle mb-2 text-body-secondary" id="release_date">Data de Lançamento: ${dataInvertida}</h5>\
          <p class="card-text" id="overview">${filme.overview}</p>\
        </div>\
      </div> `;
        divRepetida.appendChild(novaDiv); //colocando no HTML
        console.log(novaDiv);
      });

      // //NOME DO FILME
      // title.innerHTML = filmesBuscados.title;

      // //VOTO
      // //vote_average.innerHTML = filmesBuscados.vote_average.toFixed(1)

      // //GENERO
      // let generofetch = response;
      // let generoInicial = filmesBuscados.genre_ids; // retorna id: 12, 18
      // let lista2 = generoInicial.map(function (i) { // i= 12 && i= 18
      //   let oi = genres.filter(function (objeto) {// na 2 volta o objeto vai ser {id: 12}
      //     return i == objeto.id;
      //   })
      //   console.log(oi);
      //   return oi[0].name
      // });
      // genre.innerHTML = `${lista2[0]}, ${lista2[1]}`;

      // //RELEASE DATE
      // let dataInicial = filmesBuscados.release_date.split("-"); //transforma string em array
      // let dataInvertida = `${dataInicial[2]}-${dataInicial[1]}-${dataInicial[0]}`;
      // release_date.innerHTML = dataInvertida;

      // //RESUMO DO FILME
      // overview.innerHTML = filmesBuscados.overview;

      // //IMAGEM FILME
      // imagemFilme.src = imagemURL + filmesBuscados.poster_path
      // imagemFilme.alt = filmesBuscados.title

      // console.log(imagemFilme.id);
    });

  //.catch((err) => console.error(err));
}

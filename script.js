function buscar() {
  let campoPesquisa = window.document.getElementById("search-bar");
  let valorCampoPesquisa = campoPesquisa.value;
  console.log(valorCampoPesquisa);
  let title = window.document.getElementById("title");
  let vote_average = window.document.getElementById("vote_average");
  let genre = window.document.getElementById("genre");
  let release_date = window.document.getElementById("release_date");
  let overview = window.document.getElementById("overview");

  let filmesBuscados = [];
  let genresBuscados = [];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGY1YzYwMzA0MzhjY2NjMTA3MGNiOTI1YzAyODBlYSIsInN1YiI6IjY1NGJkZjA4YjE4ZjMyMDBlMmNmNDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.POF3PJoF_ufJ3RKW7A_ZHp8d4nvp6jzuIL6qLFIfQdU",
    },
  };

  //chamando os gêneros
  fetch("https://api.themoviedb.org/3/genre/movie/list", options)
    .then((response) => response.json())
    .then((response) => {
      genresBuscados = response;
    })
    .catch((err) => console.error(err));
  //FAÇA MAP E/ OU FILTER

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${valorCampoPesquisa}&include_adult=false&language=pt-br&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      filmesBuscados = response.results[0];
      title.innerHTML = filmesBuscados.title;
      vote_average.innerHTML = filmesBuscados.vote_average;

      //genero
      let generofetch = response;
      let generoInicial = filmesBuscados.genre_ids;
      genre.innerHTML = `${generoInicial[0]} ${generoInicial[1]}`;

      //Release
      let dataInicial = filmesBuscados.release_date.split("-"); //transforma string em array
      let dataInvertida = `${dataInicial[2]}-${dataInicial[1]}-${dataInicial[0]}`;
      release_date.innerHTML = dataInvertida;

      overview.innerHTML = filmesBuscados.overview;

      console.log(filmesBuscados);
    });

  //.catch((err) => console.error(err));
}

// .then((response) => {
//     var listaFilmes = response.results.filter(
//         function (item){
//             console.log(item)
//             return item.release_date=== "2023-09-22"
//         }
//     )
//     console.log(listaFilmes)
// })

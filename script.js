function buscar(){
    let campoPesquisa = window.document.getElementById('search-bar').value 

    let valorCampoPesquisa = campoPesquisa.value
    console.log(valorCampoPesquisa)

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGY1YzYwMzA0MzhjY2NjMTA3MGNiOTI1YzAyODBlYSIsInN1YiI6IjY1NGJkZjA4YjE4ZjMyMDBlMmNmNDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.POF3PJoF_ufJ3RKW7A_ZHp8d4nvp6jzuIL6qLFIfQdU",
  },
};

fetch(
  "https://api.themoviedb.org/3/trending/movie/week?language=pt-br",
  options
)
  .then((response) => response.json())
  .then((response) => {
    var listaFilmes = response.results.map(function (item) {
      return item.release_date;
    }); 
    console.log(listaFilmes) 
    })
  .catch((err) => console.error(err));

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
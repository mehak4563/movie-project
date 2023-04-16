// IIFE Immediately invoked function Expressions
(async function () {
  const response = await fetch("./movie.json");
  const movie = await response.json();

  const inputElem = document.getElementById("searchInput");
  const btnElem = document.getElementById("searchBtn");
  const listElem = document.getElementById("genre-list");
  const detailsElem = document.getElementById("genreDetailsContainer");

  function loadmovieDetails(movie) {
    detailsElem.innerHTML = `
        <h2 class="title">${movie.title}</h2>
        <h3>genre:</h3>
        <ul>${movie.genre.map(function (genre) {
          return "<li>" + genre + "</li>"
        }).join("")}</ul>
        <h3>year:</h3>
        <div>${movie.year}</div>
    `;
  }

  function displaySearchResults (results) {
    listElem.innerHTML = "";
    results.forEach(function (genre) {
      const li = document.createElement("li");
      const listItem = `
          <h2 class="title">${genre.title}</h2>
          <div class="description">${genre.description}</div>
      `;
      li.innerHTML = listItem;
      li.addEventListener("click", function () {
        loadmovieDetails(movie);
      });
      listElem.appendChild(li);
    })
  }

  function search() {
    const query = inputElem.value.toLowerCase();
    const results = movie.filter(function (movie) {
      return (movie.title.toLowerCase().includes(query) ||
      movie.year.join(" ").toLowerCase().includes(query))
    });

    displaySearchResults(results);
  }

  btnElem.addEventListener("click", search);
})();
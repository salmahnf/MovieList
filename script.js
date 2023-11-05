const main = document.querySelector(".container-film");
const apikey = "98f03ad5";

function OnChangeSearch(searchParam, page) {
  axios
    .get(`https://www.omdbapi.com/?apikey=${apikey}&s=${searchParam}&page=${page}`)
    .then((response) => {
      const movies = response.data.Search;
      if (movies === undefined) {
        const foundText = document.querySelector(".found");
        foundText.textContent = `Title: '${searchParam}'`;
        main.innerHTML = notFound();
      } else {
        let cards = "";
        movies.forEach((data) => (cards += showCards(data)));
        const foundText = document.querySelector(".found");
        foundText.textContent = `Title: '${searchParam}'`;
        main.innerHTML = cards;        

        const cardsDetail = document.querySelectorAll(".card-film");

        cardsDetail.forEach((detail) => {
          detail.addEventListener("click", function () {
            const imdbId = detail.getAttribute("data-id");
            axios.get(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbId}`)
              .then((response) => {
                const details = response.data;
                console.log(details);
                const movieDetail = contentDetail(details);
                const detailcontent = document.querySelector(".container-detail");
                detailcontent.style.display = "flex";
                detailcontent.innerHTML = movieDetail;
        
                const buttonx = document.querySelector(".closeDetail");
                buttonx.addEventListener("click", () => (detailcontent.style.display = "none"));
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });        
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const showCards = (data) => {
  return `
    <div class="card-film" data-id="${data.imdbID}">
      <img src="${data.Poster}" alt="${data.Title}"/>
      <h3>${data.Title} (${data.Year})</h3>
    </div>
  `;
};

const notFound = () => {
  return `
    <h1 class="notFound">not found</h1>
  `;
};

const input = document.getElementById("search");
const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", () => {
  OnChangeSearch(input.value);
});

const nextPage = document.querySelector(".next");
const prevPage = document.querySelector(".prev");
const page = document.querySelector(".page-number");
let currentPage = 1;

nextPage.addEventListener("click", () => {
  currentPage++;
  page.innerText = currentPage;
  OnChangeSearch(input.value, currentPage);
});

prevPage.addEventListener("click", () => {
  if (page.innerText > 1) {
    currentPage--;
    page.innerText = currentPage;
    OnChangeSearch(input.value, currentPage);
  }
});

input.addEventListener("blur", () => {
  currentPage = 1;
  page.innerText = currentPage;
  OnChangeSearch(input.value, currentPage);
});

const text = "MOVIE";
const typingText = document.getElementById("typing-text");

function typeText(index) {
  if (index < text.length) {
    typingText.innerHTML += text.charAt(index);
    setTimeout(() => typeText(index + 1), 200); // Ganti 200 dengan kecepatan mengetik yang diinginkan
  }
}

typeText(0);


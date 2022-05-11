// @ts-nocheck

// const API_KEY = "919d47dae2msh0f191c7cffd313bp196f6cjsn65d79d3adf31";
const API_KEY = "f153cb6f22msh5ed79cf8c006778p13a8eejsn237d395e5afb";

const inputNode = document.querySelector(".text");
const resultNode = document.querySelector(".result");
const searchNode = document.querySelector(".search");
const cancelBtn = document.querySelector(".icon-cancel");

let searchResults = [];

inputNode.addEventListener("input", (e) => {
  if (e.target.value.toString()) {
    debouncedSearch(e.target.value.toString());
  } else {
    clearSearchResults();
  }
});

let timer;
function debouncedSearch(query) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    searchForResult(query);
  }, 500);
}

async function searchForResult(searchQuery) {
  searchResults = [];
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      "X-RapidAPI-Key": API_KEY,
    },
  };

  let response = await fetch(
    `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete?text=${searchQuery}`,
    options
  );
  response = await response.json();
  for (data of response) {
    searchResults.push({ data: data });
  }

  if (!searchResults.length) {
    searchResults.push({ name: "No results found" });
  }

  loadResultsInDom(searchResults, searchQuery);
}

function loadResultsInDom(searchResults, searchQuery) {
  resultNode.innerHTML = "";
  for (let result of searchResults) {
    let res = document.createElement("div");
    res.classList.add("item");
    res.innerHTML = `<b>${result.data.substring(
      0,
      searchQuery.length
    )}</b>${result.data.substring(searchQuery.length)}`;
    resultNode.appendChild(res);
  }
  resultNode.classList.add("highlight");
  resultNode.classList.add("results");
  searchNode.classList.add("searchDone");
}

cancelBtn.addEventListener("click", () => {
  inputNode.value = "";
  clearSearchResults();
});

function clearSearchResults() {
  searchNode.classList.remove("searchDone");
  resultNode.classList.remove("results");
  resultNode.innerHTML = "";
}

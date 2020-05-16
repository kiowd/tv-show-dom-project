//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  // Level 1 and 2 functions
  /*displayDataForAllEpisode(allEpisodes);
	displaySearchData(allEpisodes);
	selectInput(allEpisodes);
	displaySelectInput(allEpisodes);*/

  // fetch SHOWs Level 3 and 4 functions
  const allShow = getAllShows();
  showDataList(allShow);
  showDataListSelected(allShow);
  sortOption();
  //  displaySearchData(allShow);

  // functions for Level 5
   displayTVShows(allShow);
  // homepageTvShows();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = `The data has (originally) come from <a href= "https://www.tvmaze.com/" target="_blank">TVMaze.com</a> `;
}

function displayDataForOneEpisode(episode) {
  const divEl = document.getElementById("level100");
  const imgEl = episode.image.medium;
  divEl.innerHTML = `<h1 class= "ep_name">${
    episode.name
  } - S${episode.runtime
    .toString()
    .padStart(2, "0")}E${episode.weight.toString().padStart(2, "0")}</h1>
	<img src= ${imgEl}>
	<article class= "summary">${episode.summary}</article>`;
}

function displayDataForAllEpisode(allEpisodes) {
  const divEl = document.getElementById("level100");
  allEpisodes.forEach((ep) => {
    let wrap_divEl = document.createElement("div");
    wrap_divEl.setAttribute("id", "wrapper");
    divEl.append(wrap_divEl);
    wrap_divEl.innerHTML = `<h1 class= "ep_name">
		${ep.name} - S${ep.season
      .toString()
      .padStart(2, "0")}E${ep.number.toString().padStart(2, "0")}</h1>
		<img src ='${
      ep.image == null
        ? "https://image.shutterstock.com/image-vector/house-not-available-icon-flat-260nw-1030785001.jpg"
        : ep.image.medium
    }'/>
	<article class= "summary">${ep.summary}</article>`;
  });

  let lv5divEl = document.getElementById("level500");
  lv5divEl.style.display = "none";
}

function displaySearchData(allEpisodes) {
  const searchBar = document.getElementById("searchBar");
  // const divEl = document.getElementById("warpper");
  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const divEl = document.getElementById("level100");
    const wrap_divEls = divEl.querySelectorAll("#warpper");
    const filteredCharacters = allEpisodes.filter((ep) => {
      return (
        ep.name.toLowerCase().includes(searchString) ||
        ep.summary.toLowerCase().includes(searchString)
      );
    });
    displayCharacters(filteredCharacters);
    document.querySelector(
      ".length"
    ).innerHTML = `Displaying : ${filteredCharacters.length}/ ${allEpisodes.length}`;
    console.log(filteredCharacters.length);
    let lv5divEl = document.getElementById("level500");
    lv5divEl.style.display = "none";
  });
}

const selectInput = (allEpisodes) => {
  const selectEl = document.getElementById("ep_s_e");
  allEpisodes.forEach((ep) => {
    const selectEl = document.getElementById("ep_s_e");
    const optionEl = document.createElement("option");
    selectEl.append(optionEl);
    optionEl.setAttribute("value", `${ep.name}`);
    optionEl.innerHTML = `S${ep.season
      .toString()
      .padStart(2, "0")}E${ep.number.toString().padStart(2, "0")} - ${
      ep.name
    } `;
  });
};

const displaySelectInput = (allEpisodes) => {
  const selectEl = document.getElementById("ep_s_e");
  selectEl.addEventListener("change", (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filteredEpisode = allEpisodes.filter((ep) => {
      return ep.name.toLowerCase().includes(searchString);
    });
    displayCharacters(filteredEpisode);
    let lv5divEl = document.getElementById("level500");
    lv5divEl.style.display = "none";
  });
};

const displayCharacters = (ep) => {
  const divEl = document.getElementById("level100");
  const wrap_divEls = divEl.querySelectorAll("#warpper");
  const htmlString = ep.map((ep) => {
    return `
            <div id="warpper">
                <h1 class= "ep_name">
		${ep.name} - S${ep.season
      .toString()
      .padStart(2, "0")}E${ep.number.toString().padStart(2, "0")}</h1>
								<img src="${ep.image.medium}"></img>
                <article class="summary">${ep.summary}</article>
                
            </div>
        `;
  });
  // .join('');
  divEl.innerHTML = htmlString;
};

// Shows Fetch
async function showLists(shId) {
  const URL = `https://api.tvmaze.com/shows/${shId}/episodes`;
  // const URL = `http://api.tvmaze.com/singlesearch/shows?q=girls&embed=episodes`;
  try {
    const fetchResult = fetch(
      new Request(URL, { method: "GET", cache: "reload" })
    );
    const response = await fetchResult;
    const jsonData = await response.json();
    console.log(jsonData);
    displayDataForAllEpisode(jsonData);
    displaySearchData(jsonData);
    selectInput(jsonData);
    displaySelectInput(jsonData);
    showDataListSelected(jsonData);
  } catch (e) {
    throw Error(e);
  }
}
//showLists(99);

const showDataList = (allEpisodes) => {
  allEpisodes.forEach((ep) => {
    const selectEl = document.getElementById("allShows");
    const optionEl = document.createElement("option");
    selectEl.append(optionEl);
    optionEl.setAttribute("value", `${ep.id}`);
    // optionEl.innerHTML = `${ep.name}`;
    var newtext = document.createTextNode(`${ep.name}`);
    optionEl.appendChild(newtext);
  });
};

const sortOption = () => {
  // const my_options = document.querySelectorAll("#allShows option");
  const my_selectEl = document.querySelector("#allShows");
  const options = Array.from(my_selectEl.options);
  //console.log(Array.from(my_options));
  const sorted = options.sort(function (a, b) {
    if (a.text > b.text) return 1;
    else if (a.text < b.text) return -1;
    else return 0;
  });

  sorted.forEach((option) => my_selectEl.add(option));
};

const showDataListSelected = (allEpisodes) => {
  const selectEl = document.getElementById("allShows");
  selectEl.addEventListener("change", (e) => {
    const episodeOption = document.getElementById("ep_s_e");
    while (episodeOption.firstChild)
      episodeOption.removeChild(episodeOption.lastChild);
    const optionEl = document.createElement("option");
    episodeOption.append(optionEl);
    optionEl.setAttribute("value", " ");
    var newtext = document.createTextNode("All Episodes");
    optionEl.appendChild(newtext);
    const searchString = e.target.value;
    console.log(searchString);

    const filteredEpisode = allEpisodes.filter((ep) => {
      // let saveId = showLists(ep.id);
      if (searchString == ep.id) {
        console.log(showLists(ep.id));
        return;
        showLists(ep.id);
      }
    });
    //displayShows(filteredEpisode);
    displayCharacters(filteredEpisode);
  });
};

/* Level 500 */
const displayTVShows = (ep) => {
  const divEl = document.getElementById("level500");
  //const wrap_divEls = divEl.querySelectorAll("#warpper");
  const htmlString = ep.map((ep) => {
    const wrapper_divEl = document.createElement("div");
    wrapper_divEl.classList.add("wrapper");
    const h1El = document.createElement("h1");
    h1El.classList.add("title");
    const h1Text = document.createTextNode(`${ep.name}`);
    h1El.append(h1Text);
    const container_divEl = document.createElement("div");
    container_divEl.classList.add("container");
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", `${ep.image.medium}`);
    const articleEl = document.createElement("article");
    articleEl.classList.add("summary");
    const articleText = document.createTextNode(
      `${ep.summary.replace(/(<([^>]+)>)/gi, "")}`
    );
    articleEl.append(articleText);
    const small_container_divEl = document.createElement("div");
    small_container_divEl.classList.add("small_container");
    const p1El = document.createElement("p");
    p1El.classList.add("summa");
    const p1Text = document.createTextNode(`Rating: ${ep.rating.average}`);
    p1El.append(p1Text);
    const p2El = document.createElement("p");
    p2El.classList.add("summa");
    const p2Text = document.createTextNode(`Genres: ${ep.genres}`);
    p2El.append(p2Text);
    const p3El = document.createElement("p");
    p3El.classList.add("summa");
    const p3Text = document.createTextNode(`Status: ${ep.status}`);
    p3El.append(p3Text);
    const p4El = document.createElement("p");
    p4El.classList.add("summa");
    const p4Text = document.createTextNode(`Runtime: ${ep.runtime} mins`);
    p4El.append(p4Text);
    small_container_divEl.append(p1El, p2El, p3El, p4El);
    container_divEl.append(imgEl, articleEl, small_container_divEl);
    divEl.append(wrapper_divEl, h1El, container_divEl);
  });
};

function homepage() {
  let lv5divEl = document.getElementById("level500");
  lv5divEl.style.display = "block";
  console.log("What is happening!" + lv5divEl);
}
const homepageTvShows = () => {
  let btnEl = document.getElementById("btn");
  btnEl.onclick = homepage;
};

window.onload = setup;

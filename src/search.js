import { convertEpoch } from "../util/helper-functions.js";
import { generateComments } from "./comments.js";
import { pageRender } from "./pageRender.js";

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const contentBox = document.getElementById('content');
    contentBox.innerHTML= '<br>Loading...'

    //send search terms
    const getSearch = async () => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${event.target[0].value}`);
        const json = await response.json();
        return json.data.children;
    }

    const searchResults = await getSearch();

    const searchData = searchResults.map(obj => obj.data);

    

    const page = [];

    searchData.forEach((obj) => {
        const post = pageRender(obj, convertEpoch, generateComments);
        page.push(post);
    })

    contentBox.innerText = '';

    document.getElementById('content-header').innerText = `Search Results for "${event.target[0].value}"`

    document.getElementById('search-text').value = '';

    document.getElementById('all-button').style.backgroundColor = '';
    document.getElementById('all-button').style.border = '';
    document.getElementById('popular-button').style.backgroundColor = '';
    document.getElementById('popular-button').style.border = '';

    contentBox.append(...page);
});
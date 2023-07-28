var searchDish = "";
let inputBar = document.getElementById('input-bar');   
let searchbtn = document.getElementById('search-btn');
let searchResult = document.getElementById("searchResult");



searchbtn.addEventListener('click', takeInput);     //adding event for search button, once clicked it will exec takeInput func

function getStorage() {             // this is to get local storage data.
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
}

function takeInput() {


    searchDish = inputBar.value;    // whatever the data is typed in search bar, it is assigned to searchDish variable.
    if (searchDish == "") {
        alert('Provide dish name...!'); //if we dont type any dish and click the btn it will show the notification.
        return;
    }
    // inputBar.value = "";        //once we are done with searching we will make the input value to null
    mealsData(searchDish).then((data) => {      //this will return the dish data from the API, which has the dish name appended to it. 
        let dishInfo = data.meals;
        
        // let dish = data.meals;
        // let dishName = [];
        // for (var i = 0; i < dish.length; i++) {
        //     dishName.push(dish[i].strMeal);
        // }
        console.log(dishInfo)   // to check if we are getting the data from API as per the searchDish name.
        searchResult.innerHTML = "";
        for (var i = 0; i < dishInfo.length; i++) {
            const { idMeal, strMeal, strMealThumb, strInstructions } = dishInfo[i];
            let favDishData = getStorage();     // we get the data from local storage in order to differentiate between the fav and unfav
            console.log(strInstructions);   // items.
            let favorite = "favorite";

            for (let j = 0; j < favDishData.length; j++) {
                if (dishInfo[i].idMeal == favDishData[j].idMeal) {
                    favorite = "UnFavorite"; //if idmeal is present in the local storage fav FileList, then the button is marked to unfav
                    break;
                }
            }
            // this is to create a container of the searched dish items and to display them on the page as per the requirement.
            let div = document.createElement("div");
            div.classList.add("dish-card");
            div.setAttribute("id", idMeal);
            let path = `./HtmlPages/Information.html#${idMeal}`;   //the id of the dish passed by appending to the info page path, to use it later.
            div.innerHTML = `
            <img class="poster" src=${strMealThumb} alt="">
            <div class="card-body">
            <a href=${path}> ${strMeal} </a>
            <input type="button" value=${favorite} id=${idMeal} data-dish='{"idMeal": "${idMeal}", "strMeal": "${strMeal}", "strMealThumb": "${strMealThumb}"}' onclick="updateFavorite(this)"/>
            </div>
        `;
            searchResult.appendChild(div);
        }
    })
//if there is any error then we get error msg in console.
        .catch((error) => {
            console.error(error);
        });



}
// here the url is appended with dishname that is typed in search bar
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s";
async function mealsData(searchDish) {      
    console.log(searchDish)
    let meals = await fetch(`${URL}=${searchDish}`)  // we fetch the data from the url provided, related to searchDish variable.

    const data = await meals.json();
    return data;    //we return the json response.
}





// this function returns the data present in local storage

function getStorage() {
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
}

//It is used to set data into local storage

function setStorage(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem("favorite", dataString);
}

//To update the favorite dish data, this function is used

function updateFavorite(e) {
    let data = JSON.parse(e.getAttribute("data-dish"));     
    let favoriteList = getStorage();                        

    for (let dish = 0; dish < favoriteList.length; dish++) {
        if (favoriteList[dish].idMeal == data.idMeal) {     
            favoriteList.splice(dish, 1);                   
            e.setAttribute("value", "Favorite");            
            setStorage(favoriteList);                       
            window.location.reload();
            return;
        }
    }

    favoriteList.push(data);                                
    setStorage(favoriteList);                                
    e.setAttribute("value", "UnFavorite");
}

// This function is used to display the fav dish items present in local storage.

function displayFav(favoriteContainer) {        

    let myFavoriteList = getStorage();              

    if (myFavoriteList.length > 0) {                
        favoriteContainer.innerHTML = "";
    }

    for (let dish = 0; dish < myFavoriteList.length; dish++) {
        const { idMeal, strMeal, strMealThumb } = myFavoriteList[dish];     
                                                                            
        let div = document.createElement("div");                             
        div.classList.add("dish-card");                                    
        div.setAttribute("id", idMeal);                                     

        let detailsPath = `./HtmlPages/Information.html#${idMeal}`;                  
        div.innerHTML = `
          <img class="thumb" src=${strMealThumb} alt="">                    
          <div class="item-container">
          <a href=${detailsPath}>${strMeal}</a>
          <input type="button" value="UnFavorite" id=${idMeal} data-dish='{"idMeal": "${idMeal}", "strMeal": "${strMeal}", "strMealThumb": "${strMealThumb}"}' onclick="updateFavorite(this)"/>
          </div>
      `;                                     
        console.log(strMealThumb, strMeal, idMeal, myFavoriteList)
        favoriteContainer.appendChild(div);
    }
}

// this is the container where all the dish items are displayed.

let favoriteContainer = document.getElementById('favorite-dish');   
if (favoriteContainer != null) {
    displayFav(favoriteContainer);
}
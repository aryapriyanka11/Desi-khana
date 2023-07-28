
// This function is generally used to get the id for the required meal and to navigate to the dish cooking instructions.
window.onload = function () {
  let instruct = document.getElementById("dishIngredients");

  let winurl = window.location.href;  //we get the url of the page where we get the id as we have appended it to the link
  let id = winurl.substring(winurl.lastIndexOf("#") + 1); //once we get the id of the meal we start fetching the data using API.

  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`; // we append the id to the API, prvided by meals DB.
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.meals);
      
      let item = data.meals[0];     // we get one item which has the id which we attached to the url.
      const { strMeal, strInstructions, strMealThumb } = item;  // we map the required attributes to the variables.
      let div = document.createElement("div");
      div.classList.add("dish-cooking-instructions");
      // here we create a container where we have image, dish name and dish instructions.
      div.innerHTML = `
          <div class="dish-image">
            <img src="${strMealThumb}" alt="">
          </div>
          <div class="dish-info">
            <h3>${strMeal}</h3>
            <p>${strInstructions || "description not found"}</p>
            
          </div>
        `;
      instruct.innerHTML = "";
      instruct.appendChild(div);
    })  // if we get any error then we get an alert.
    .catch((error) => {
      console.log(error);
    });

}


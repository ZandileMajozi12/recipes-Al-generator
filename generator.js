document
  .getElementById("recipe-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const ingredient = document.getElementById("ingredient").value;
    const type = document.getElementById("type").value;
    const resultsDiv = document.getElementById("recipe-results");
    resultsDiv.innerHTML = "<p>Loading...</p>";

    const apiKey = "1e31ef6a9a8147f999bd3852df612ca4"; // User's Spoonacular API Key
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${type} ${ingredient}&apiKey=${apiKey}&number=5`;

    console.log("API Request URL: " + apiUrl); // Added for debugging

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data); // Log the full response for debugging

      if (data.results.length > 0) {
        resultsDiv.innerHTML = "";
        data.results.forEach((recipe) => {
          const recipeItem = document.createElement("div");
          recipeItem.innerHTML = `
                            <h3>${recipe.title}</h3>
                            <img src="${recipe.image}" alt="${recipe.title}" width="200">
                            <p><a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a></p>
                        `;
          resultsDiv.appendChild(recipeItem);
        });
      } else {
        resultsDiv.innerHTML =
          "<p>No recipes found. Try a different ingredient or baked good type.</p>";
      }
    } catch (error) {
      console.error(error); // Log errors to the console for debugging
      resultsDiv.innerHTML =
        "<p>Error fetching recipes. Please try again later.</p>";
    }
  });

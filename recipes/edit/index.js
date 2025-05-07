async function getRecipes(limit) {
    const url = "http://localhost:5001/api/v1/recipes";
    // const url = "https://express-api-jbkl.onrender.com/api/v1/recipes";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      const recipes = limit ? json.data.slice(0,limit) : json.data;
        const recipesDiv = document.getElementById("recipe-container") 

        recipesDiv.innerHTML = "";
        recipes.forEach((recipe) => {  
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe-card";
        const recipeButton = document.createElement("button");
        recipeButton.innerText = "Edit Recipe";
        recipeButton.className = "edit-recipe-button";
        recipeButton.id = `edit-recipe-${recipe.id}`;
        recipeButton.addEventListener("click", () => {
            const editUrl = `http://localhost:5001/api/v1/admin/recipes/${recipe.id}`;
            // const editUrl = `https://express-api-jbkl.onrender.com/api/v1/admin/recipes/${recipe.id}`;
        });
            const recipeImage = document.createElement("img");
            recipeImage.src = recipe.image;
            recipeImage.className = "recipe-image";
const recipeDescCard = document.createElement("div");
            recipeDescCard.className = "recipe-desc-card";

            const recipeTitle = document.createElement("h2");
            recipeTitle.innerText = recipe.name;
            recipeTitle.className = "recipe-title";
            recipeDiv.appendChild(recipeImage);
            recipeDiv.appendChild(recipeDescCard);
            recipeDescCard.appendChild(recipeTitle);
            recipeDescCard.appendChild(recipeButton);
        recipesDiv.appendChild(recipeDiv);
       
        
      });
        
    } catch (error) {
      console.error(error.message);
    }
  }

  async function showMoreButton() {
      getRecipes(); 
        const showMoreBtn = document.getElementById("show-more");
        showMoreBtn.innerText = "Show less"; 
        showMoreBtn.removeEventListener("click", showMoreButton); 
        showMoreBtn.addEventListener("click", showLessButton); 
    }

    async function showLessButton() {
        getRecipes(4); 
        const showMoreBtn = document.getElementById("show-more");
        showMoreBtn.innerText = "Show more"; 
        showMoreBtn.removeEventListener("click", showLessButton); 
        showMoreBtn.addEventListener("click", showMoreButton); 
    }
    const showMoreBtn = document.getElementById("show-more");
    showMoreBtn.addEventListener("click", showMoreButton); 

    // async function deleteRecipes() {
   

    //   }

getRecipes(4);
  
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
  
async function getRecipeById(id) {
  const url = `http://localhost:5001/api/v1/recipes/${id}`;
  
  // const url = `https://express-api-jbkl.onrender.com/api/v1/recipes/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const recipe = json.data;


    
    const recipeImage = document.getElementById("recipe-image");
    recipeImage.id = "recipe-image";
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.name;

    
    const recipeTitle = document.getElementById("recipe-title");
    recipeTitle.innerText = recipe.name;
    
   
    const recipeInstructions = document.getElementById("recipe-instructions");
recipeInstructions.innerHTML = recipe.instructions
  .map((step, i) => `<p>${i + 1}. ${step}</p>`)
  .join('');
    
    const recipeIngredients = document.getElementById("recipe-ingredients");
  
    recipe.ingredients.forEach(async ingredient => {
      const ingredientItem = document.createElement("li");
      ingredientItem.className = "recipe-ingredient-item";
      ingredientItem.id = `ingredientObjectId-${ingredient.ingredient}`;
      ingredientItem.innerText = `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
      
      
      recipeIngredients.appendChild(ingredientItem);
    });
    const recipeContainer = document.getElementById("recipe-container");
 
    
  } catch (error) {
    console.error(error.message);
  }
}

getRecipeById(id);

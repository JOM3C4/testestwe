function previewRecipeImage() {
    const recipeImage = document.getElementById("recipe-image");
    const recipeImagePreview = document.getElementById("recipe-image-preview");
    recipeImagePreview.src = recipeImage.value;
  }
  
  function previewRecipeTitle() {
    const recipe = document.getElementById("recipe-title");
    const recipeTitlePreview = document.getElementById("recipe-title-preview");
    recipeTitlePreview.innerText = "Recipe Title: " + recipe.value;
  }
  
  function previewRecipeCategory() {
    const recipeCategory = document.getElementById("recipe-category");
    const recipeCategoryPreview = document.getElementById(
      "recipe-category-preview"
    );
    recipeCategoryPreview.innerText =
      "Category: " + recipeCategory.options[recipeCategory.selectedIndex].text;
  }
  
  function previewRecipeInstructions() {
      const recipeInstructions = document.getElementById("recipe-instructions");
      const recipeInstructionsPreview = document.getElementById(
          "recipe-instructions-preview"
      );
      recipeInstructionsPreview.innerHTML = recipeInstructions.value
          .split("\n")
          .map((step, i) => `<p>${i + 1}. ${step}</p>`)
          .join("");
      }
  
  async function getCategories() {
    const url = "http://localhost:5001/api/v1/categories";
    // const url = "https://express-api-jbkl.onrender.com/api/v1/categories";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      const categories = json.data;
      const categorySelect = document.getElementById("recipe-category");
  
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  
  // async function addIngredient() {
      const ingredientSelect = document.getElementById("add-ingredient");
      const ingredientList = document.createElement("ingredient-list");
      ingredientSelect.addEventListener("onclick", () => {
          const selectedIngredient = ingredientSelect.options[ingredientSelect.selectedIndex].text;
          const ingredientItem = document.createElement("option");
          ingredientItem.value = ingredientSelect.value;
          ingredientItem.innerText = selectedIngredient;
          ingredientList.appendChild(ingredientItem);
      });
  
  
      async function getIngredients() {
          const url = "http://localhost:5001/api/v1/ingredients";
          // const url = "https://express-api-jbkl.onrender.com/api/v1/ingredients";
          try {
              const response = await fetch(url);
              if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
              }
          
              const json = await response.json();
              const ingredients = json.data;
              const ingredientSelect = document.getElementById("recipe-ingredients");
          
              ingredients.forEach((ingredient) => {
              const option = document.createElement("option");
              option.value = ingredient.id;
              option.innerText = ingredient.name;
              ingredientSelect.appendChild(option);
              });
          } catch (error) {
              console.error(error.message);
          }
      }
  
    
  
  
  getIngredients();
  getCategories();
  
  
  
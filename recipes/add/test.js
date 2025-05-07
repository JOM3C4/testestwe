async function createRecipe() {
  const recipeName = document.getElementById("recipe-name").value;
  const recipeImage = document.getElementById("recipe-image").value;
  const recipeInstructions = document.getElementById("recipe-instructions").value;
  const recipeIngredients = Array.from(
    document.getElementById("recipe-ingredients").selectedOptions
  ).map(option => option.value);
  const recipeCategory = document.getElementById("recipe-category").value;


  const url = "http://localhost:5001/api/v1/admin/recipes";
  // const url = "https://express-api-jbkl.onrender.com/api/v1/recipes";

  const data = {
    name: recipeName,
    image: recipeImage,
    instructions: recipeInstructions,
    ingredients: recipeIngredients,
    category: recipeCategory,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    alert("Recipe created successfully!");
  } catch (error) {
    console.error(error.message);
    alert("Error creating recipe: " + error.message);
  }
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

    // getCategories();
    // getIngredients();
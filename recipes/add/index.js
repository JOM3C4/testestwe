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
  // const url = "http://localhost:5001/api/v1/categories";
  const url = "https://express-api-jbkl.onrender.com/api/v1/categories";
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
  // // const url = "http://localhost:5001/api/v1/ingredients";
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

// --- INGREDIENTS DYNAMIC SECTION ---

let ingredientOptions = [];

async function fetchIngredientsList() {
  // Usa la URL que corresponda a tu backend
  const url = "http://localhost:5001/api/v1/ingredients";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const json = await response.json();
    ingredientOptions = json.data;
  } catch (error) {
    console.error(error.message);
    ingredientOptions = [];
  }
}

function fillIngredientSelect(select) {
  select.innerHTML = '<option value="" disabled selected>Select ingredient</option>';
  ingredientOptions.forEach(ingredient => {
    const option = document.createElement('option');
    option.value = ingredient.id;
    option.innerText = ingredient.name;
    select.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchIngredientsList();
  const ingredientsSection = document.getElementById('ingredients-section');
  const addIngredientBtn = document.getElementById('add-ingredient');
  const recipeForm = document.getElementById('recipe-form');

  // Llenar el primer select existente
  const firstSelect = ingredientsSection.querySelector('.ingredient-select');
  fillIngredientSelect(firstSelect);

  addIngredientBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'ingredient-row';

    const select = document.createElement('select');
    select.className = 'ingredient-select';
    select.required = true;
    fillIngredientSelect(select);

    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.className = 'ingredient-quantity';
    quantity.placeholder = 'Quantity';
    quantity.min = 0;
    quantity.required = true;

    const unit = document.createElement('input');
    unit.type = 'text';
    unit.className = 'ingredient-unit';
    unit.placeholder = 'Unit (e.g. g, ml)';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-ingredient';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      row.remove();
    });

    row.appendChild(select);
    row.appendChild(quantity);
    row.appendChild(unit);
    row.appendChild(removeBtn);

    ingredientsSection.appendChild(row);

    document.querySelectorAll('.ingredient-row .remove-ingredient').forEach(btn => btn.style.display = 'inline-block');
  });

  if (document.querySelectorAll('.ingredient-row').length > 1) {
    document.querySelectorAll('.ingredient-row .remove-ingredient').forEach(btn => btn.style.display = 'inline-block');
  }

  recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ingredients = Array.from(document.querySelectorAll('.ingredient-row')).map(row => {
      const select = row.querySelector('.ingredient-select');
      const selectedOption = select.options[select.selectedIndex];
      return {
        name: selectedOption.text,
        ingredient: select.value,
        quantity: Number(row.querySelector('.ingredient-quantity').value),
        unit: row.querySelector('.ingredient-unit').value
      };
    });
    console.log('Ingredientes:', ingredients);
  });
});



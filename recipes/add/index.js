// const recipe = document.getElementById("recipe").value;
// const recipeTitlePreview = document.getElementById("recipe-title-preview").innerText;

// recipeTitlePreview = recipe;

function previewRecipeImage() {
    const recipeImage = document.getElementById("recipe-image");
    const recipeImagePreview = document.getElementById("preview-recipe-image");
    recipeImagePreview.src = recipeImage.value;
}
function previewRecipeTitle() {
    const recipe = document.getElementById("recipe-title");
    const recipeTitlePreview = document.getElementById("recipe-title-preview");
    recipeTitlePreview.innerText = recipe.value;
}


// previewRecipeTitle();

// document.getElementById("recipe-title").addEventListener("input", function() {
//     const recipe = document.getElementById("recipe");
//     const recipeTitlePreview = document.getElementById("recipe-title-preview");
//     recipeTitlePreview.textContent = recipe.value;
// }   );

function changeTitle() {
    const formTitleElement = document.getElementById("form-recipe-title");
    const previewTitleElement = document.getElementById("preview-recipe-title");
    previewTitleElement.innerText = formTitleElement.value;
}

function addIngredient() {
    const ingredientType = document.getElementById("form-ingredient-type");
    const ingredientQuantity = document.getElementById("form-ingredient-quantity");
    const ingredientUnit = document.getElementById("form-ingredient-unit");
    const ingredientsListElement = document.getElementById("preview-recipe-ingredients-list");
    const ingredientElement = document.createElement("li");
    ingredientElement.innerText = `${ingredientQuantity.value}${ingredientUnit.innerText} - ${ingredientType.value}`
    ingredientsListElement.appendChild(ingredientElement);
}
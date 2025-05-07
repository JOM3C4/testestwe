

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



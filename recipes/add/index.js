

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


function previewRecipeCategory() {
    const recipeCategory = document.getElementById("recipe-category");
    const recipeCategoryPreview = document.getElementById("recipe-category-preview");
    recipeCategoryPreview.innerText = recipeCategory.options[recipeCategory.selectedIndex].text;
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

    getCategories();


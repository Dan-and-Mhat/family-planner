function showTab(tabName) {

    document.getElementById("shopping").style.display = "none";
    document.getElementById("meals").style.display = "none";
    document.getElementById("favourites").style.display = "none";

    document.getElementById(tabName).style.display = "block";
}
function addMealIngredient() {

    const item = prompt("New ingredient:");

    if (!item) return;

    const container =
        document.getElementById("mealIngredients");

    container.innerHTML +=
        `<label><input type="checkbox"> ${item}</label><br>`;
}

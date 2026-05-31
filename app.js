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
    `<label class="shopping-item">
        <input type="checkbox">
        ${item}
    </label>`;

    saveShopping();
}
function saveShopping() {

    localStorage.setItem(
        "mealIngredients",
        document.getElementById("mealIngredients").innerHTML
    );
}

function loadShopping() {

    const saved =
        localStorage.getItem("mealIngredients");

    if(saved) {

        document.getElementById("mealIngredients")
            .innerHTML = saved;
    }
}

window.onload = function() {

    loadShopping();
};

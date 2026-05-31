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

 container.innerHTML += `
<label class="shopping-item">
    <span>
        <input type="checkbox">
        ${item}
    </span>

    <button
        class="delete-btn"
        onclick="deleteItem(this)">
        🗑
    </button>
</label>`;

    saveShopping();
    saveCheckboxes();
}
function deleteItem(button) {

    const item =
        button.parentElement;

    item.remove();

    saveShopping();
    saveCheckboxes();
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

    loadCheckboxes();

    document.addEventListener(
        "change",
        function(event){

            if(
                event.target.type ===
                "checkbox"
            ){
                saveCheckboxes();
            }
        }
    );
};
function saveCheckboxes() {

    const checkboxes =
        document.querySelectorAll(
            "#mealIngredients input[type='checkbox']"
        );

    const states = [];

    checkboxes.forEach(box => {
        states.push(box.checked);
    });

    localStorage.setItem(
        "mealIngredientStates",
        JSON.stringify(states)
    );
}
function loadCheckboxes() {

    const saved =
        localStorage.getItem(
            "mealIngredientStates"
        );

    if (!saved) return;

    const states =
        JSON.parse(saved);

    const checkboxes =
        document.querySelectorAll(
            "#mealIngredients input[type='checkbox']"
        );

    checkboxes.forEach((box,index) => {

        if(states[index] !== undefined) {

            box.checked =
                states[index];
        }
    });
}

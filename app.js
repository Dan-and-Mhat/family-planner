function showTab(tabName) {

    document.getElementById("shopping").style.display = "none";
    document.getElementById("meals").style.display = "none";
    document.getElementById("favourites").style.display = "none";

    document.getElementById(tabName).style.display = "block";
}
function addItem(containerId) {

    const item = prompt("New item:");

    if (!item) return;

    const container =
        document.getElementById(containerId);

    container.innerHTML += `
<label class="shopping-item">
    <span>
        <input type="checkbox">
        ${item}
    </span>

    <button
    class="edit-btn"
    onclick="editItem(this)">
    ✏️
</button>

<button
    class="delete-btn"
    onclick="deleteItem(this)">
    🗑
</button>
</label>`;

    saveShopping();
    saveCheckboxes();
}
function editItem(button) {

    const itemText =
        button.parentElement
              .querySelector("span");

    const currentText =
        itemText.textContent.trim();

    const newText =
        prompt("Edit item:", currentText);

    if (!newText) return;

    itemText.innerHTML = `
        <input type="checkbox"
               ${itemText.querySelector("input").checked ? "checked" : ""}>
        ${newText}
    `;

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

    localStorage.setItem(
        "weeklyStaples",
        document.getElementById("weeklyStaples").innerHTML
    );

    localStorage.setItem(
        "miloItems",
        document.getElementById("miloItems").innerHTML
    );
}

function loadShopping() {

    const meal =
        localStorage.getItem("mealIngredients");

    if(meal) {
        document.getElementById(
            "mealIngredients"
        ).innerHTML = meal;
    }

    const staples =
        localStorage.getItem("weeklyStaples");

    if(staples) {
        document.getElementById(
            "weeklyStaples"
        ).innerHTML = staples;
    }

    const milo =
        localStorage.getItem("miloItems");

    if(milo) {
        document.getElementById(
            "miloItems"
        ).innerHTML = milo;
    }
}

window.onload = function() {

    loadShopping();

    loadMeals();

    loadCheckboxes();

    document.querySelectorAll(".meal-plan input")
    .forEach(input => {
        input.addEventListener(
            "input",
            saveMeals
        );
    });

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
            "input[type='checkbox']"
        );

    const states = [];

    checkboxes.forEach(box => {
        states.push(box.checked);
    });

    localStorage.setItem(
        "checkboxStates",
        JSON.stringify(states)
    );
}
function loadCheckboxes() {

    const saved =
        localStorage.getItem(
            "checkboxStates"
        );

    if (!saved) return;

    const states =
        JSON.parse(saved);

    const checkboxes =
        document.querySelectorAll(
            "input[type='checkbox']"
        );

    checkboxes.forEach((box, index) => {

        if (states[index] !== undefined) {

            box.checked =
                states[index];
        }
    });
}
function saveMeals() {

    const meals = {
        monday: document.getElementById("mondayMeal").value,
        tuesday: document.getElementById("tuesdayMeal").value,
        wednesday: document.getElementById("wednesdayMeal").value,
        thursday: document.getElementById("thursdayMeal").value,
        friday: document.getElementById("fridayMeal").value,
        saturday: document.getElementById("saturdayMeal").value,
        sunday: document.getElementById("sundayMeal").value
    };

    localStorage.setItem(
        "weeklyMeals",
        JSON.stringify(meals)
    );
}
function loadMeals() {

    const saved =
        localStorage.getItem("weeklyMeals");

    if (!saved) return;

    const meals =
        JSON.parse(saved);

    document.getElementById("mondayMeal").value =
        meals.monday || "";

    document.getElementById("tuesdayMeal").value =
        meals.tuesday || "";

    document.getElementById("wednesdayMeal").value =
        meals.wednesday || "";

    document.getElementById("thursdayMeal").value =
        meals.thursday || "";

    document.getElementById("fridayMeal").value =
        meals.friday || "";

    document.getElementById("saturdayMeal").value =
        meals.saturday || "";

    document.getElementById("sundayMeal").value =
        meals.sunday || "";
}
function addFavouriteMeal() {

    const meal = prompt("Meal name:");

    if (!meal) return;

    document.getElementById(
        "favouriteMeals"
    ).innerHTML += `
<label class="shopping-item">
    <span>${meal}</span>
</label>`;

    saveFavourites();
}
function saveMeals() {

    const days = [
        "mondayMeal",
        "tuesdayMeal",
        "wednesdayMeal",
        "thursdayMeal",
        "fridayMeal",
        "saturdayMeal",
        "sundayMeal"
    ];

    days.forEach(day => {

        localStorage.setItem(
            day,
            document.getElementById(day).value
        );
    });

    updateSummary();
}
function loadMeals() {
    
document.querySelectorAll(".meal-card input")
.forEach(input => {

    input.addEventListener(
        "input",
        saveMeals
    );
});
    const days = [
        "mondayMeal",
        "tuesdayMeal",
        "wednesdayMeal",
        "thursdayMeal",
        "fridayMeal",
        "saturdayMeal",
        "sundayMeal"
    ];

    days.forEach(day => {

        const saved =
            localStorage.getItem(day);

        if(saved){

            document.getElementById(day).value =
                saved;
        }
    });

    updateSummary();
}
function updateSummary() {

    const summary =
        document.getElementById("summaryContent");

    summary.innerHTML = `
🍽 Monday: ${document.getElementById("mondayMeal").value}<br>
🍽 Tuesday: ${document.getElementById("tuesdayMeal").value}<br>
🍽 Wednesday: ${document.getElementById("wednesdayMeal").value}<br>
🍽 Thursday: ${document.getElementById("thursdayMeal").value}<br>
🍽 Friday: ${document.getElementById("fridayMeal").value}<br>
🍽 Saturday: ${document.getElementById("saturdayMeal").value}<br>
🍽 Sunday: ${document.getElementById("sundayMeal").value}
`;
}
function addFavouriteMeal() {

    const meal =
        prompt("Favourite meal:");

    if(!meal) return;

    const container =
        document.getElementById(
            "favouriteMeals"
        );

    container.innerHTML += `
<label class="shopping-item">
    <span>${meal}</span>
    <button
        class="delete-btn"
        onclick="deleteFavourite(this)">
        🗑
    </button>
</label>`;

    saveFavourites();
}

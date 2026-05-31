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

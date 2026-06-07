const SUPABASE_URL =
    "https://oawoebrdioyisdlufxiz.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_7NpP75AZhAfgO2LTgEEO_A_SSthULLj";

const db =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

function showTab(tabName) {

    document.getElementById("shopping").style.display = "none";
    document.getElementById("meals").style.display = "none";
    document.getElementById("favourites").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("calendar").style.display = "none";

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
    
    loadFavouritesFromSupabase();

    loadShopping();

    loadMeals();

    loadCheckboxes();

    generateCalendar();

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
    showTab("dashboard");
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
async function addFavouriteMeal() {

    const meal =
        prompt("Favourite meal:");

    if(!meal) return;

    const recipe =
        prompt(
            "Recipe (optional):"
        ) || "";

    let emoji = "🍽";

    const lower =
        meal.toLowerCase();

    if(lower.includes("korma"))
        emoji = "🍛";
    else if(lower.includes("pizza"))
        emoji = "🍕";
    else if(lower.includes("salmon"))
        emoji = "🐟";
    else if(lower.includes("lasagna"))
        emoji = "🍝";
    else if(lower.includes("spaghetti"))
        emoji = "🍝";
    else if(lower.includes("bolognese"))
        emoji = "🍝";
    else if(lower.includes("burger"))
        emoji = "🍔";
    else if(lower.includes("carbonara"))
        emoji = "🍝";
    else if(lower.includes("tuna"))
        emoji = "🐟";
    else if(lower.includes("gamberi"))
        emoji = "🦐";
    
const { error } =
    await db
        .from("favourites")
        .insert([
            {
                meal_name: meal,
                emoji: emoji,
                recipe: recipe
            }
        ]);

if(error){
    console.error(error);
    alert("Failed to save favourite");
    return;
}
    
await loadFavouritesFromSupabase();
}

    let selectedMeal = "";
    let currentRecipeMeal = null;

function useFavourite(item) {

    selectedMeal =
        item.textContent.trim();

    document.getElementById(
        "dayPicker"
    ).style.display = "flex";
}
function openRecipe(button) {

    const meal =
        button.parentElement
              .querySelector("span");

    currentRecipeMeal = meal;

    document.getElementById(
        "recipeTitle"
    ).textContent =
        meal.textContent.trim();

    document.getElementById(
        "recipeText"
    ).value =
        meal.dataset.recipe || "";

    document.getElementById(
        "recipeText"
    ).readOnly = true;

    document.getElementById(
        "recipeViewer"
    ).style.display = "flex";
}
function enableRecipeEdit() {

    document.getElementById(
        "recipeText"
    ).readOnly = false;
}
function saveRecipeEditor() {

    if(currentRecipeMeal){

        currentRecipeMeal.dataset.recipe =
            document.getElementById(
                "recipeText"
            ).value;
    }

    closeRecipeViewer();
}
function closeRecipeViewer() {

    document.getElementById(
        "recipeViewer"
    ).style.display = "none";
}
function assignMeal(day) {

    const input =
        document.getElementById(
            day + "Meal"
        );

    input.value =
        selectedMeal;

    saveMeals();
    updateSummary();

    document.getElementById(
        "dayPicker"
    ).style.display = "none";
}
function closeDayPicker() {

    document.getElementById(
        "dayPicker"
    ).style.display = "none";
}
function startNewWeek() {

    if (
        !confirm(
            "Start a new week?\n\n" +
            "• Clear all planned meals\n" +
            "• Untick shopping items\n" +
            "• Keep favourite meals\n" +
            "• Keep shopping items"
        )
    ) return;

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

        document.getElementById(day).value = "";

        localStorage.removeItem(day);
    });

    document
        .querySelectorAll(
            "input[type='checkbox']"
        )
        .forEach(box => {

            box.checked = false;
        });

    saveCheckboxes();

    updateSummary();
}
async function loadFavouritesFromSupabase() {

    const { data, error } =
        await db
            .from("favourites")
            .select("*");

    console.log("DATA:", data);

    if(error){
        console.error(error);
        return;
    }

    const container =
        document.getElementById(
            "favouriteMeals"
        );

    container.innerHTML = "";

    data.forEach(meal => {

        container.innerHTML += `
<div class="favourite-item">

    <span onclick="useFavourite(this)"
          style="cursor:pointer;"
          data-recipe="${meal.recipe}">
        ${meal.emoji} ${meal.meal_name}
    </span>

    <button
        class="recipe-btn"
        onclick="openRecipe(this)">
        📖
    </button>

    <button
        class="delete-btn"
        onclick="deleteFavourite(this)">
        🗑
    </button>

</div>`;
    });
}
function generateCalendar() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        today.getMonth();

    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",

        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.getElementById(
        "calendarMonth"
    ).textContent =
        "📅 " +
        monthNames[month] +
        " " +
        year;

    const grid =
        document.getElementById(
            "calendarGrid"
        );

    grid.innerHTML = "";

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

   const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();

const offset =
    firstDay === 0
    ? 6
    : firstDay - 1;

for(
    let i = 0;
    i < offset;
    i++
){

    grid.innerHTML += `
<div class="calendar-day empty">
</div>`;
}

for(
    let day = 1;
    day <= daysInMonth;
    day++
){

    grid.innerHTML += `
<div class="calendar-day">

    <div class="day-number">
        ${day}
    </div>

</div>`;
}

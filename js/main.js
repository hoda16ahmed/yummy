var Data = document.getElementById("Data");
var search = document.getElementById("search");


$(document).ready(function(){
    searchByName("").then(function(){
        $(".loading").fadeOut(500)
        $("body").css("overflow", "auto")

    })
})

function openNav() {
    $(".side-menu").animate({left: 0}, 500)
    $(".open-icon").removeClass("fa-align-justify");
    $(".open-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".side-menu .tab").outerWidth()
    $(".side-menu").animate({ left: -boxWidth }, 500)

    $(".open-icon").addClass("fa-align-justify");
    $(".open-icon").removeClass("fa-x");
    $(".links li").animate({ top: 300}, 500)
}

closeNav()
$(".side-menu i.open-icon").click(() => {
    if ($(".side-menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})
function displayMeals(data) {
    var c = "";

    for (var i = 0; i < data.length; i++) {
        c += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = c
}
///search
function SearchInputs() {
    c = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    search.innerHTML=c
    Data.innerHTML = ""
}
async function searchByName(name) {
   Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)
    var searchNameResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    var searchName= await searchNameResponce.json()
    if( searchName.meals){
      displayMeals(searchName.meals)  
    }
    else{ displayMeals([])}
    $(".inner-loading").fadeOut(300)

}
async function searchByFirstLetter(name) {
  Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)
    if(name == ""){
       name = "a" 
    }else{""}
    var searchFirstNameResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    var searchFirstName= await searchFirstNameResponce.json()
    if(searchFirstName.meals){
        displayMeals(searchFirstName.meals)
    }
     else{displayMeals([])} 
    $(".inner-loading").fadeOut(300)

}
//categories

async function getCategories() {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)
    search.innerHTML = ""; 
  var categoriesResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var category= await categoriesResponce.json()
    displayCategories(category.categories) 
    $(".inner-loading").fadeOut(300)

}
function displayCategories(data) {
    var c = "";

    for (var i = 0; i < data.length; i++) {
        c += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    Data.innerHTML = c
}

async function getCategoryMeals(category) {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)
    var categoriesResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    var category= await categoriesResponce.json()
    displayMeals(category.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

//area
async function getArea() {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    search.innerHTML = "";
    var AreaResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    var Area= await AreaResponce.json()
    displayArea(Area.meals)
    $(".inner-loading").fadeOut(300)
}
function displayArea(data) {
    var c = "";

    for (var i = 0; i < data.length; i++) {
        c += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center meal">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }

    Data.innerHTML = c
}
async function getAreaMeals(area) {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)
    var AreaResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    var Area= await AreaResponce.json()
    displayMeals(Area.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}


//ingredient
async function getIngredients() {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    search.innerHTML = "";
    var IngredientsResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    var Ingredients= await IngredientsResponce.json()
    displayIngredients(Ingredients.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}


function displayIngredients(data) {
    var c = "";

    for (var i = 0; i < data.length; i++) {
        c += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 text-center ">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    Data.innerHTML = c
}

async function getIngredientsMeals(ingredients) {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)
    var IngredientsResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    var Ingredients= await IngredientsResponce.json()
    displayMeals(Ingredients.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

////////details

async function getMealDetails(mealID) {
    Data.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    search.innerHTML = "";
    var detailsResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    var details= await detailsResponce.json()
    displayMealDetails(details.meals[0])
    $(".inner-loading").fadeOut(300)

}
function displayMealDetails(meal) {
    
    search.innerHTML = "";
    var ingredients = ``
    for (var i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
  var tags = meal.strTags?.split(",")
    if (!tags) tags = []
    var tagsStr = ''
    for (var i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    var c = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    Data.innerHTML = c
}



////contact us
function Contacts(){
 var   c=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input " type="text" class="form-control" placeholder="Enter Your Name">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input  type="email" class="form-control " placeholder="Enter Your Email">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control " placeholder="Enter Your Phone">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input  type="number" class="form-control " placeholder="Enter Your Age">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  type="password" class="form-control " placeholder="Enter Your Password">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  type="password" class="form-control " placeholder="Repassword">
                <div class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button   class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`
Data.innerHTML = c
}


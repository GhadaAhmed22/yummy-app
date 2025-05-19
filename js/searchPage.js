import {getMealsBySelctor } from "./main.js";
import { toggleSidebar } from "./shared.js";

let CategoriesPage=document.querySelector('.Categories')
let IngredientsPage=document.querySelector('.Ingredients')
let AreaPage=document.querySelector('.Area')
let ContactPage=document.querySelector('.Contact')
let nameInput=document.querySelector('.name')
let letterInput=document.querySelector('.letter')
let MyRow=document.querySelector('.row')

document.querySelector('.side-bar .icon').addEventListener('click', function(){
    toggleSidebar();
})
CategoriesPage.addEventListener('click', () => {
 nameInput.classList.add('d-none')
 letterInput.classList.add('d-none')
  getMealsBySelctor('c');
  toggleSidebar; // Explicitly toggle sidebar when needed
});
AreaPage.addEventListener('click', () => {
nameInput.classList.add('d-none')
 letterInput.classList.add('d-none')
  getMealsBySelctor('a');
  toggleSidebar; // Explicitly toggle sidebar when needed
});
IngredientsPage.addEventListener('click', () => {
    nameInput.classList.add('d-none')
     letterInput.classList.add('d-none')
  getMealsBySelctor('i');
  toggleSidebar(); // Explicitly toggle sidebar when needed
});

// MyRow.innerHTML=''

async function searchByLetter(name){
      try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
        if (data.ok) {
            data = await data.json();
            let meals = data.meals
            console.log(meals)
            displayResult(meals)
        }
    }
    catch(error) {
        console.log('somthing wrong ',error)
    }
}
async function searchByName(name){
      try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        if (data.ok) {
            data = await data.json();
            let meals = data.meals
            console.log(meals)
            displayResult(meals)
        }
    }
    catch(error) {
        console.log('somthing wrong',error)
    }
}

letterInput.addEventListener('input',()=>{
    searchByLetter(letterInput.value)
    document.querySelector('.loading').classList.toggle('loader')
    console.log(letterInput.value)
});
nameInput.addEventListener('input',()=>{
    searchByName(nameInput.value)
   document.querySelector('.loading').classList.toggle('loader')

});
function displayResult(data){
 let content = ''
    for (let i = 0; i < data.length; i++) {
        content += `
        <div class="col-lg-3 meal position-relative" data-id="${data[i].idMeal}">
    <div class="inner-column position-relative">  <!-- Fixed class name -->
        <img src="${data[i].strMealThumb}" class="w-100 d-block" alt="">
        <div class="overlay">
            <h3 class="meal_name">${data[i].strMeal}</h3>
        </div>
    </div>
</div>`
    }
    MyRow.innerHTML = content

}

document.querySelector('.side-bar .icon').addEventListener('click',()=>{
document.querySelector('.side-bar').classList.toggle('active')
document.querySelector('.close').classList.toggle('d-none')
document.querySelector('.menu-bar').classList.toggle('d-none')
}
)

ContactPage.addEventListener('click',()=>{
 location.href = 'contactUs.html'; 
})



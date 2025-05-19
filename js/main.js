let MyRow = document.querySelector('.row')
let CategoriesPage=document.querySelector('.Categories')
let SearchPage=document.querySelector('.Search')
let IngredientsPage=document.querySelector('.Ingredients')
let AreaPage=document.querySelector('.Area')
let ContactPage=document.querySelector('.Contact')

let globelEle;
async function getAllMeals() {
    try {
        let data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        if (data.ok) {
            data = await data.json();
            let meals = data.meals.slice(0, 20);
            console.log(meals)
            displayAllMeals(meals)
            setMealDetails()
        }
    }
    catch {
        console.log('somthing wrong ')
    }
}

// getAllMeals()
if (window.location.pathname.includes('index.html') || 
    window.location.pathname === '/yummy-app/' || 
    window.location.pathname === '/yummy-app/index.html') {
  getAllMeals(); // Only runs on the homepage
  CategoriesPage.addEventListener('click',()=>{
 console.log('cat'); 
 getMealsBySelctor('c')
})
AreaPage.addEventListener('click',()=>{
console.log('area'); 
 getMealsBySelctor('a')
 ;})
 IngredientsPage.addEventListener('click',()=>{
console.log('inter'); 
 getMealsBySelctor('i');})
}

 function displayAllMeals(data) {
       if (!data || data.length === 0) {
        MyRow.innerHTML = '<div class="col-12 text-center"><h3>No meals found for this filter</h3></div>';
        return;
    }
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
 async function getMealsBySelctor(element){
    globelEle=element
document.querySelector('.side-bar').classList.toggle('active')
document.querySelector('.close').classList.toggle('d-none')
document.querySelector('.menu-bar').classList.toggle('d-none')


   try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${element}=list`)
        if (data.ok) {
            data = await data.json();
            let meals = data.meals
            console.log(meals)
            if(element ==='a'){
              displayAllAreas(meals);  
            }
            
             if(element==='i'){
              displayAllIngredients(meals);  
            }
             if(element==='c'){
              displayAllCategories(meals);  
            }
            setClicked()
          
        }
    }
    catch (error) {
        console.log('Something went wrong:', error);
    }
}
export { getMealsBySelctor };

// export { getMealsBySelctor };





function displayAllAreas(data){

    let content = ''
    for (let i = 0; i < data.length; i++) {
        content += `<div class="col-lg-3 p-4">
        <div class="area-content d-flex flex-column align-items-center">
        <i class="fa-solid fa-house fs-2"></i>
        <h3>${data[i].strArea}</h3>
        </div>
       </div>`
    }
    MyRow.innerHTML = content
}

function displayAllCategories(data) {
     let content = ''
    for (let i = 0; i < data.length; i++) {
        content += `<div class="col-lg-3 p-4">
        <div class="area-content d-flex flex-column align-items-center">
       <i class="fa-solid fa-utensils fs-2"></i>
        <h3>${data[i].strCategory}</h3>
        </div>
       </div>`
    }
    MyRow.innerHTML = content
}

function displayAllIngredients(data) {
  const words = 10;
  let content = ''; 
  data.forEach(ingredient => {
    const description = ingredient.strDescription 
      ? `${ingredient.strDescription.split(' ').slice(0, words).join(' ')}...`
      : 'No description available';
    content += `
      <div class="col-lg-3 p-4">
        <div class="area-content d-flex flex-column align-items-center">
          <i class="fa-solid fa-drumstick-bite "></i>
          <h3>${ingredient.strIngredient}</h3>
          <p class="meal_desc text-center">${description}</p>
        </div>
      </div>`;
  });

  MyRow.innerHTML = content;
}
function setClicked(){
      MyRow.addEventListener('click', function (e) {
        if (e.target.tagName === 'H3') {
            console.log(e.target.textContent,globelEle)
            FilterMealsBySelector(e.target.textContent,globelEle);
        }
    });
}

async function FilterMealsBySelector(meal,element) {
    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${element}=${meal}`)
        if (data.ok) {
            data = await data.json();
            let meals = data.meals
               if (meals) {
                displayFilterdMeals(meals);
                setMealDetails();
            } else {
                displayFilterdMeals([]); // Pass empty array if no meals found
            } 
        }
    }
    catch (error) {
        console.log('Something went wrong:', error);
         displayFilterdMeals([]);
    }

}
function displayFilterdMeals(data){
       if (!data || data.length === 0) {
        MyRow.innerHTML = '<div class="col-12 text-center"><h3>No meals found for this filter</h3></div>';
        return;
    }
     let content = ''
    for (let i = 0; i < data.length; i++) {
        content+=`<div class="col-lg-3 meal position-relative " data-id="${data[i].idMeal}">
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
function setMealDetails(){
     MyRow.querySelectorAll('.meal').forEach(meal => {
        meal.onclick = null;
    });
    
    MyRow.addEventListener('click', function(e) {
    const mealElement = e.target.closest('.meal');
    if (mealElement) {
        const mealId = mealElement.dataset.id;
        console.log('Meal clicked:', mealId);
         GetMealDetails(mealId)
    }
});
    
}
async function GetMealDetails(id) {
    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        if (data.ok) {
            data = await data.json();
            let meals = data.meals
            console.log(meals)
            displayMealDetail(meals)
        }
    }
    catch (error) {
        console.log('Something went wrong:', error);
    }

}


// function displayMealDetail(data) {
//        if (!data || data.length === 0) {
//         MyRow.innerHTML = '<div class="col-12 text-center"><h3>No meals found for this filter</h3></div>';
//         return;
//     }
//     let content = ''
//     for (let i = 0; i < data.length; i++) {

//          // Safely handle tags (which might be null)
//         let tagsHtml = '';
//         if (meal.strTags) {
//             meal.strTags.split(',').forEach(tag => {
//                 const trimmedTag = tag.trim();
//                 tagsHtml += `<span class="tag-badge">${trimmedTag}</span>`;
//             });
//         }

//         // Safely handle instructions (might be null in some edge cases)
//         const instructions = meal.strInstructions || 'No instructions available';

//         content += `
//        <div class="col-lg-4">
//                 <img src="${data[i].strMealThumb}" class='w-100' alt="">
//             </div>
//             <div class="col-lg-8">
//                 <h2>Instructions</h2>
//                 <p>${data[i].strInstructions}</p>
//                 <div>Area : ${data[i].strArea}</div>
//                 <div>Category : ${data[i].strCategory}</div>
//                 <div>
//                     <span>Recipes :</span>
//                     <div class="ingerdaints mt-3 d-flex flex-wrap gap-2">
                    
//                        ${generteingradint(data[i])}                     
//                     </div>
//                    <div class="fs-4">Tags :</div>
//                      <div class="tags mt-3  mb-3 d-flex flex-wrap gap-2">
//                       ${tagsHtml}

//                     </div>
//                     <button class=" source btn btn-success"><a href="${data[i].strSource}" target="_blank">Source</a></button>
//                      <button class=" source btn btn-warning"><a href="${data[i].strYoutube}" target="_blank">YOutub</a></button>
//                 </div>
//             </div>`
//     }
//     MyRow.innerHTML = content
//     }

function displayMealDetail(data) {
    if (!data || data.length === 0) {
        MyRow.innerHTML = '<div class="col-12 text-center"><h3>No meal details found</h3></div>';
        return;
    }

    let content = '';
    for (let i = 0; i < data.length; i++) {
        const meal = data[i];
        
        let tagsHtml = '';
        if (meal.strTags) {
            meal.strTags.split(',').forEach(tag => {
                const trimmedTag = tag.trim();
                tagsHtml += `<span class="tag-badge">${trimmedTag}</span>`;
            });
        }

        const instructions = meal.strInstructions || 'No instructions available';

        content += `
        <div class="col-lg-4">
            <img src="${meal.strMealThumb || ''}" class='w-100' alt="${meal.strMeal || 'Meal image'}">
        </div>
        <div class="col-lg-8">
            <h2>${meal.strMeal || 'Meal'}</h2>
            <h3>Instructions</h3>
            <p>${instructions}</p>
            <div>Area: ${meal.strArea || 'Unknown'}</div>
            <div>Category: ${meal.strCategory || 'Unknown'}</div>
            <div>
                <span>Recipes:</span>
                <div class="ingerdaints mt-3 d-flex flex-wrap gap-2">
                    ${generteingradint(meal)}                     
                </div>
                <div class="fs-4">Tags:</div>
                <div class="tags mt-3 mb-3 d-flex flex-wrap gap-2">
                    ${tagsHtml || '<span>No tags available</span>'}
                </div>
                ${meal.strSource ? `<button class="source btn btn-success"><a href="${meal.strSource}" target="_blank">Source</a></button>` : ''}
                ${meal.strYoutube ? `<button class="source btn btn-warning"><a href="${meal.strYoutube}" target="_blank">YouTube</a></button>` : ''}
            </div>
        </div>`;
    }
    MyRow.innerHTML = content;
}


    function generteingradint(meal){
           let ingredients = '';
    for (let i = 1; i <= 15; i++){
        const ingredient = meal[`strIngredient${i}`];
    ingredients += `<span class="badge bg-primary p-1">${ingredient}</span> `
    }
    return ingredients
    }

    

document.querySelector('.side-bar .icon').addEventListener('click',()=>{
document.querySelector('.side-bar').classList.toggle('active')
document.querySelector('.close').classList.toggle('d-none')
document.querySelector('.menu-bar').classList.toggle('d-none')
})

ContactPage.addEventListener('click',()=>{
 location.href = 'contactUs.html'; 
})
SearchPage.addEventListener('click',()=>{
 location.href = 'searchPage.html'; 
})
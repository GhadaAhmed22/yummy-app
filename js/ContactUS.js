import {getMealsBySelctor } from "./main.js";
import { toggleSidebar } from "./shared.js";

// Your existing variable declarations...

// import { displaybyCategory } from "./categories.js";

let Name = document.querySelector('#Name');
let Email = document.querySelector('#Email')
let Phone = document.querySelector('#Phone')
let Age= document.querySelector('#Age')
let Password = document.querySelector('#Password')
let Repassword = document.querySelector('#Repassword')
let SubmitBtn = document.querySelector('.SubmitBtn')
let CategoriesPage=document.querySelector('.Categories')
let SearchPage=document.querySelector('.Search')
let IngredientsPage=document.querySelector('.Ingredients')
let AreaPage=document.querySelector('.Area')
let ContactPage=document.querySelector('.Contact')

document.querySelector('.side-bar .icon').addEventListener('click', function(){
    toggleSidebar
})
CategoriesPage.addEventListener('click', () => {
  getMealsBySelctor('c');
  toggleSidebar; // Explicitly toggle sidebar when needed
});
AreaPage.addEventListener('click', () => {
  getMealsBySelctor('a');
  toggleSidebar; // Explicitly toggle sidebar when needed
});
IngredientsPage.addEventListener('click', () => {
  getMealsBySelctor('i');
  toggleSidebar; // Explicitly toggle sidebar when needed
});



CategoriesPage.addEventListener('click', () => getMealsBySelctor('c'))

// valdation()
// 01012345678
// 01234567890
 var regex = {
        Name: /^[A-Za-z\s]+$/,
        Email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        Phone: /^(\+20|0)?1[0125]\d{8}$/,
        Age: /^(1[01][0-9]|120|[1-9]?[0-9])$/,
        Password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        Repassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    }
function valdationInput(element) {

   
     let errorElement= document.getElementById(`${element.id}-error`)
       if (element.value.length === 0) {
        errorElement.classList.replace('d-block', 'd-none');
        return false;
    }

    if (regex[element.id].test(element.value)) {
        console.log('true')
        errorElement.classList.replace('d-block', 'd-none')
        return true;
    }
    else {
     errorElement.classList.replace('d-none', 'd-block')
    // errorElement.textContent = getErrorMessage(element.id);  
    }
   
}

function setupValdation() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            valdationInput(this)
           
            if (this.id === 'Password' || this.id === 'Repassword') {
                if (Password.value != Repassword.value) {
                    console.log('no matching') 
                    return false
                }
                else {
                    console.log('matching')

                }
            }
             ActiveateBtn()
    
        });
   
    });



}

setupValdation()
function ActiveateBtn()
{

if(valdationInput(Name)&&valdationInput(Email)&&valdationInput(Age)&&
valdationInput(Phone)&&valdationInput(Password)&&valdationInput(Repassword)){
 SubmitBtn.removeAttribute('disabled');
}
}
 



SearchPage.addEventListener('click',()=>{
 location.href = 'searchPage.html'; 
})
CategoriesPage.addEventListener('click',()=>{
 console.log('cat'); 
 getMealsBySelctor('c')
})
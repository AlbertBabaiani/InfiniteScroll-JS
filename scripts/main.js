'use strict'

const accessKey = 'vRYCsGCF_d0O-g7go_bGYD3h88MK0EZQXptePlXe7-c';
let query = '';

const form = document.forms.form;
const input = form.input;
const submit_btn = document.getElementById('submit');

const error_message = document.getElementById('er');
const error_message_text = 
`<div class="error-message text-center wow fadeInUp mt-5">
<i class="bi bi-exclamation-triangle-fill display-1 text-danger"></i>
<h2 class="fw-bold mt-3">Sorry! We did not find anything :(</h2>
</div>`

let column = 1;

const container = document.querySelector('.custom-container');
const columns = [...container.querySelectorAll('.col')]


function img_focus_add(){
    container.classList.add('focus')
}

function img_focus_remove(){
    container.classList.remove('focus')
}


async function get_img(){
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
    const data = await response.json();

    for(let i=0; i<data.results.length; i++){
        const img = document.createElement('img');
        img.src = data.results[i].urls.regular;
        img.classList.add('wow', 'fadeInUp')
        // img.setAttribute('data-wow-delay', `${0. * Math.random()}s`)

        img.addEventListener('mouseenter', img_focus_add)
        img.addEventListener('mouseleave', img_focus_remove)


        document.querySelector(`.col-${column}`).append(img);
        // console.log(column)
        column++;
        if(column === 5) column = 1;

        // if(i === data.results.length - 1) alert('fff')
    }
}



function submit_input(){
    error_message.innerHTML = '';
    query = input.value.trim();

    if(query){
        // console.log('hhfg')
        
        columns.forEach(el =>{
            el.innerHTML = ''
        })
        get_img().catch(error =>{
            console.log(error)
            error_message.innerHTML += error_message_text;
        })
    }
}

form.addEventListener('submit', function(e){
    // console.log('gg')
    e.preventDefault();
    submit_input()
})
submit_btn.addEventListener('click', submit_input)

window.addEventListener('scroll', function(){
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 800){
        get_img()
    }
})


window.onload = function(){
    input.value = ''
}



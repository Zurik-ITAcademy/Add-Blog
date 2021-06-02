// DOM 
const $container = document.querySelector('.blog-cards');
const $inputAuthor = document.querySelector('.inputAuthor');
const $inputTitle = document.querySelector('.inputTitle');
const $inputImg = document.querySelector('.inputImg');
const $submit = document.querySelector('.submit');
const $inputBody = document.querySelector('.inputBody');
const $searchSelect = document.querySelector('.searchSelect');
const $searchInput = document.querySelector('.searchInput');

// Получения данных
window.addEventListener('load', () =>{
   fetch('http://2.57.186.103:5000/api/posts')
   .then(res => res.json())
   .then(r =>{
       const temp  = r.data.map(item=> cardTemplate(item)).join('');
       $container.innerHTML = temp;
   })
   .catch(()=>{
       console.error('Что то не так');
   })
})

// Функция для получения карточки

function cardTemplate(item){
    return`
        <div class="cards" style="background:url('${item.img}') center / cover">
            <div class="title"><h1>${item.title}</h1></div>
            <div class="text-body">
                <p class="body-text">${item.body}</p>
                <p class="data-text">${item.date}</p>
                <p class="name-text">${item.author}</p>
            </div>
            <div class="footer_cont">
                <div class="cont_child">
                    <button onclick="deleteBlog('${item._id}')" class="btn-delete"><i class="fas fa-trash-alt"></i></button>
                    <button onclick="editBlog('${item._id}')"  class="btn-edit"><i class="fas fa-edit"></i></button>
                </div>
            </div>
        </div>
    `
}

// // Отправка постов на базу
$submit.addEventListener('click', e =>{
    e.preventDefault();
    if($inputBody.value && $inputImg.value && $inputTitle.value && $inputAuthor){
        if($inputBody.value.length >= 150){
            alert('Описания не должно превышать 150 символов!')
        }else{
            fetch('http://2.57.186.103:5000/api/posts/', {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: $inputTitle.value,
                    body: $inputBody.value,
                    author: $inputAuthor.value,
                    date: new Date(),
                    img: $inputImg.value
                })
            })
            .then(res => res.json())
            .then(r=>{
                console.log(r);
                window.location.reload()
            })
            .catch(err=>{
                console.error(err);
            })           
        }
    }else{
        alert('Не все поля заполнены!!!')
    }
})

//  Удаления блока
function deleteBlog(_id){
    console.log(_id);
    const ackDelete = confirm('Are u sure?');
    if(ackDelete){
        fetch(`http://2.57.186.103:5000/api/posts/${_id}`,{
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(r=>{
            console.log(r);
            window.location.reload()
        })
        .catch(()=>{
            console.error('Что то не так');
        })
    }
}

// Изменения блока

function editBlog(_id){
    console.log(_id);
    const editBlog = confirm('Are u sure?')
    if(editBlog){
        fetch('http://2.57.186.103:5000/api/posts/',{
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                _id: _id,
                title: prompt('New Title'),
                body: prompt('New Body'),
                author: prompt('New  Author'),
                img: prompt('New URL - Image'),
            }),
        })
        .then(res => res.json())
        .then(r=>{
            console.log(r);
            window.location.reload()
        })
        .catch(()=>{
            console.error('Что то не так');
        })
    }
}




// ========================= Пагинация не работает 👇👇👇!!! //
// Pagination

// const $prevBtn = document.querySelector('.prevBtn');
// const $nextBtn = document.querySelector('.nextBtn');
// const $page = document.querySelector('.page');
// const LIMIT = 4;
// let pageCounter = 1;
// let offsetCounter = 0;
// const TOTAL_POKEMONS = 1118;
// const TOTAL_PAGES = Math.floor(TOTAL_POKEMONS / LIMIT);

// const getRequestPag = (query, cb) =>{
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', `http://2.57.186.103:5000/api/posts?${query}`);
//     xhr.addEventListener('load', () => {
//         const response = JSON.parse(xhr.response);
//         cb(response);
//     })
//     xhr.addEventListener('error', err => {
//         console.log('Возникла ошибка!');
//     })
//     xhr.send();
// }

// window.addEventListener('load', () => {
//     $page.innerHTML = pageCounter;
//     $prevBtn.setAttribute('disabled',true);
// });

// $nextBtn.addEventListener('click', e => {
//     e.preventDefault();
//     $prevBtn.removeAttribute('disabled');
//     if(pageCounter >= 1){
//         if(pageCounter === 4){
//             $nextBtn.setAttribute('disabled', true);
//             getRequestPag(`http://2.57.186.103:5000/api/posts/${page}/limit=${LIMIT}`, res => {
//                 pageCounter++;
//                 $page.innerHTML = pageCounter;
//                 const temp = res.data.map(item => cardTemplate(item)).join('');
//                 $container.innerHTML = temp;
//             })
//         }else{
//             getRequestPag(`http://2.57.186.103:5000/api/posts/limit=${LIMIT}`, res => {
//                 pageCounter++;
//                 $page.innerHTML = pageCounter;
//                 const temp = res.data.map(item => cardTemplate(item)).join('');
//                 $container.innerHTML = temp;
//             })
//         }
//     }
// })

// $prevBtn.addEventListener('click', e => {
//     e.preventDefault();
//     if(pageCounter >= 1){
//         pageCounter--;
//         if(pageCounter === 1){
//             $prevBtn.setAttribute('disabled', true);
//             getRequestPag(`http://2.57.186.103:5000/api/posts/limit=${LIMIT}`, res =>{
//                 $page.innerHTML = pageCounter;
//                 const temp = res.data.map(item => cardTemplate(item)).join('');
//                 $container.innerHTML = temp;
//             })
//         }else{
//             getRequestPag(`http://2.57.186.103:5000/api/posts/limit=${LIMIT}`, res => {
//                 $nextBtn.removeAttribute('disabled');
//                 $page.innerHTML = pageCounter;
//                 const temp = res.data.map(item => cardTemplate(item)).join('');
//                 $container.innerHTML = temp;
//             })
//         }
//     }
// })


// Поиск Не работает 👇👇👇 !!!!

// Поиск блоки
// const routes = {
//     page:1,
//     limit:10,
//     total: 0,
//     data:{
//         _id: '_id',
//         title: 'title',
//         body: 'body',
//         author: 'author',
//         date: 'new Date()',
//         img: 'img'
//     }
// }
// $searchSelect.addEventListener('change', e =>{
//     const value =  e.target.value;
//     // window.location.reload()

//     if(value === "author"){
//         $searchInput.setAttribute('placeholder', 'Enter author')
//         $searchInput.value = ''
//     }else{
//         $searchInput.setAttribute('placeholder', 'Enter title');
//         $searchInput.value = '';
//     }
// })

// Поиск страну по столице или по имени

// $searchInput.addEventListener('input', e =>{
//     const selectValue = $searchSelect.value;
//     const value = e.target.value;
//     getRequestPag(`${value === '' ? `http://2.57.186.103:5000/api/posts/${data}` : [selectValue]}`, res=>{
//         const cardList = res.data.map(({_id, title, body, author, date, img})=>{
//             return  cardTemplate(_id, title, body, author, date, img);
//         }).join('');
        
//         $container.innerHTML = cardList;
//     })
// })
// window.location.reload() ({_id, title, body, author, date, img})
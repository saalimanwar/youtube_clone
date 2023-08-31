

function moveLeft (e) {
    const categoryName = e?.delegateTarget?.dataset?.category;
    const videosContainer = document.querySelector("#"+categoryName);
    const oldMargin = videosContainer.style.marginLeft || "0px";
    console.log(oldMargin)
    videosContainer.style.marginLeft = oldMargin?.replace("px", "") - 280;
}

function moveRight (e) {
    const categoryName = e?.delegateTarget?.dataset?.category;
    const videosContainer = document.querySelector("#"+categoryName);
    const oldMargin = videosContainer.style.marginLeft || "0px";
    console.log(oldMargin)
    videosContainer.style.marginLeft = Number(oldMargin?.replace("px", "")) + 280;
}


function addListeners () {
    var menu = document.querySelector("#menu");
    menu.addEventListener("click", () => {
        var sidebar = document.querySelector("#sidebar");
        if(sidebar.classList.contains("d-none")){
            sidebar.classList.remove("d-none")
            sidebar.classList.add("d-block")
        }
        else {
            sidebar.classList.remove("d-block")
            sidebar.classList.add("d-none")
        }
    })
    var prevButtons = document.querySelectorAll(`.carousel-control-prev`);
    var nextButtons = document.querySelectorAll(`.carousel-control-next`);
    [...prevButtons]?.forEach(prevButton => {
        console.log(prevButtons)
        prevButton.addEventListener('click', moveRight)
    });

    [...nextButtons]?.forEach(prevButton => {
        prevButton.addEventListener('click', moveLeft)
    })
}

function renderVideoItem (videoItem, categoryName){
   const videoThumbnail = `
    <div class="video">
            <div class="video_thumbnail">
                <img src="${videoItem?.thumbnail}" alt="">
            </div>
            <div class="video_details">
                <div class="author">
                </div>
                <div class="title">
                    <h3>${videoItem?.name}</h3>
                    <span> ${videoItem?.views} views • ${videoItem?.relase_time} </span>
                </div>

            </div>
        </div>
   `
   const videosContainer = document.querySelector("#" + categoryName);
   videosContainer.innerHTML += videoThumbnail;
}

function renderCategory (categoryName, category){
    const carouselContainer = document.querySelector("#carousel_container");
    const videosContainerElement = `
        <p class="fw-bold mb-4 ms-1">${categoryName}</p>
        <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="videos_container" id="${categoryName}">
                       
                    </div>
                </div>
            </div>
            <button id="leftButton-${categoryName}" data-category="${categoryName}" class="carousel-control-prev  bg-white border border-1 p-3 rounded-circle" type="button"
                data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="material-symbols-outlined">
                    chevron_left
                </span>
            </button>
            <button  id="rightButton-${categoryName}" data-category="${categoryName}" class="carousel-control-next bg-white border border-1 p-3 rounded-circle" type="button"
                data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="material-symbols-outlined">
                    chevron_right
                </span>
            </button>
        </div>
    `

    carouselContainer.innerHTML += videosContainerElement;
    (category || []).forEach(videoItem => {
        renderVideoItem(videoItem, categoryName)
    })
}

function renderCategories (categories) {
    (Object.entries(categories) || []).forEach(([categoryName, categoryValue]) => {
        renderCategory(categoryName, categoryValue)
    })
}



document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    renderCategories(data)
    addListeners()

});
// renderCategory(Object.entries(data)[0][0], Object.entries(data)[0][1])
// renderCategory(Object.entries(data)[1][0], Object.entries(data)[1][1])
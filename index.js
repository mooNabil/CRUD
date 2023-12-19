// HTML ELEMENTS VARIABLES

let siteName = document.getElementById("siteName");

let siteUrl = document.getElementById("siteUrl");

let submit = document.getElementById("submit");

let visit = document.getElementById("visit");

let deleteEl = document.getElementById("deleteEl");

let mybody = document.getElementById("mybody");

let main = document.getElementById("main");

let closeBtn = document.getElementById("closeBtn")

let lighBox = document.getElementById("lighBox")



let crudList;

if (localStorage.getItem("crudList")) {
    crudList = JSON.parse(localStorage.getItem("crudList"));
    displayCrud(crudList);
} else {
    crudList = [];
}

submit.addEventListener("click", function (e) {
    e.stopPropagation()
    if (crudValidation() === true && validateUrl() === true) {
        let links = {
            name: siteName.value,
            link: siteUrl.value,
        }
        crudList.push(links);
        SaveToLocalStorage()
        displayCrud(crudList);
        clearData();

    } else {
        console.log("not valid");
        lighBox.classList.remove("d-none");
    }

})

function clearData() {

    siteName.value = ""
    siteUrl.value = ""
}

function displayCrud(crudList) {

    let cartona = ""

    for (let i = 0; i < crudList.length; i++) {

        cartona += ` <tr>
        <td>${i + 1}</td>
        <td> ${crudList[i].name} </td>
        <td>
            <a href="https://www.${crudList[i].link}.com" target="_blank" id="visit" class="btn btn-success">
                <i class="fa-regular fa-eye px-1"></i>
                Visit
            </a>
        </td>
        <td>
            <button onclick="deleteItem(${i})" id="deleteEl" class="btn btn-danger ">
                <i class="fa-solid fa-trash-can px-1"></i>
                Delete
            </button>
        </td>
    </tr>
        `
    }


    mybody.innerHTML = cartona;

}

function deleteItem(index) {

    crudList.splice(index, 1)
    SaveToLocalStorage()
    displayCrud(crudList);
}

function SaveToLocalStorage() {

    localStorage.setItem("crudList", JSON.stringify(crudList))

}

function crudValidation() {
    let regular = /^[a-zA-Z0-9]{3,20}$/;


    if (regular.test(siteName.value) === true) {
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        return true;
    } else {
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        return false;
    }

}

closeBtn, addEventListener("click", function (e) {
    e.stopPropagation()
    closeLightBox()
})

function closeLightBox() {

    lighBox.classList.add("d-none");
}

function validateUrl() {
    let regular = /^[a-zA-Z]{1,20}$/;

    if (regular.test(siteUrl.value) === true) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        return true;
    } else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        return false;
    }
}








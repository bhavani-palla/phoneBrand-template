const inputData = document.getElementById("inputdata");
const phoneListItem = document.querySelector(".phonelistitem");
const detailBtn = document.getElementById('details');
let modalDetail = document.querySelector(".modal-body");
let modalTitle = document.querySelector('.modal-title')


let spinnerDiv = document.createElement('div');
spinnerDiv.classList.add('spinner-border')


inputData.addEventListener("keyup", searchPhone);

async function showDetails(url) {


  while (modalDetail.firstChild) {
    modalDetail.removeChild(modalDetail.firstChild);
  }

  modalDetail.appendChild(spinnerDiv);
  spinnerDiv.style.display = 'block';
  

  let response = await fetch(url);
  let data = await response.json();
  //console.log(data);

  spinnerDiv.style.display = 'none';
  
  

  let mobBrandDiv = document.createElement("div");
  mobBrandDiv.innerHTML = `Brand: ${data.data.brand}`;
  modalTitle.innerHTML = `Model: ${data.data.phone_name}`;

  let mobDimensionDiv = document.createElement('div');
  mobDimensionDiv.innerHTML = `Dimension: ${data.data.dimension}`;


  modalDetail.appendChild(mobBrandDiv);
  modalDetail.appendChild(mobDimensionDiv);
  
  

}

async function searchPhone(e) {
  try {
    let response = await fetch(
      `https://api-mobilespecs.azharimm.site/v2/search?query=${inputData.value}`
    );
    let data = await response.json();
    // console.log(data)

    while (phoneListItem.firstChild) {
      phoneListItem.removeChild(phoneListItem.firstChild);
    }

    if (data.status) {


      const phones = data.data.phones;

      // if (phones || phones.length < 1) {
      //   modelHTML = document.createElement("li");
      //   modelHTML.innerHTML = "Results not found";
      //   phoneListItem.appendChild(modelHTML);
      // }
        for (let phone of phones) {
          modelHTML = document.createElement("li");

          // create div with class name phone

          let phoneDiv = document.createElement("div");
          phoneDiv.classList.add("phone");

          //create div with class name brand

          let phoneBrand = document.createElement("div");
          phoneBrand.classList.add("brand");
          phoneBrand.innerHTML = `${phone.phone_name}`;

          let phoneImageDiv = document.createElement("div");
          phoneImageDiv.classList.add("picture");

          let phoneImage = document.createElement("img");
          phoneImage.setAttribute("src", phone.image);
          phoneImage.classList.add("phone-pic");
          phoneImageDiv.appendChild(phoneImage);
          phoneDiv.appendChild(phoneImageDiv);

          phoneDiv.appendChild(phoneBrand);
          modelHTML.appendChild(phoneDiv);
          phoneListItem.appendChild(modelHTML);

          // create element btn with class name
          let detailBtn = document.createElement("button");
          detailBtn.classList.add("details");
          detailBtn.innerHTML = "Details";
          detailBtn.setAttribute("onclick", `showDetails("${phone.detail}")`);

          detailBtn.setAttribute("data-toggle", "modal");
          detailBtn.setAttribute("data-target", "#myModal");

          phoneDiv.appendChild(detailBtn);
        }
    }
  } catch (error) {
    console.log(error)
    
  }
}

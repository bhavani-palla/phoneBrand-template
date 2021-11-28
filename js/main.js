const inputData = document.getElementById("inputdata");
const inputPhoneName = document.getElementById("phoneName");
const phoneListItem = document.querySelector(".phonelistitem");

inputData.addEventListener("keyup", searchPhone);

async function showDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
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
      for (let phone of data.data.phones) {
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
    // modelHTML = document.createElement("li");

    modelHTML.innerHTML = "Results not found";
     phoneListItem.appendChild(modelHTML);
  }
}

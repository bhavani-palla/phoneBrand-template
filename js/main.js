const inputData = document.getElementById('inputdata');
const inputPhoneName = document.getElementById('phoneName');
const phoneListItem = document.querySelector(".phonelistitem");

inputData.addEventListener('keyup', searchPhone);
async function searchPhone(e) {
    let response = await fetch(
      "https://api-mobilespecs.azharimm.site/v2/brands/apple-phones-48?page=2"
    );
    let data = await response.json();
    console.log(data)
    for (let phoneModel of data.brand) {
        modelHTML = document.createElement('li');

        // create div with class name phone

        let phoneDiv = document.createElement('div');
        phoneDiv.classList.add('phone')

        //create div with class name brand

        let phoneBrand = document.createElement('div')
        phoneBrand.classList.add('brand');
        phoneBrand.innerHTML =`${phoneModel.brand}`


        phoneDiv.appendChild(phoneBrand)
        phoneListItem.appendChild(modelHTML)
         
     }
    
}
searchPhone()
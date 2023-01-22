const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

    const displayPhones = (phones, dataLimit) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    
    phoneContainer.innerText = "";
    
// Display 9 Phones 
const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0,9);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

// Display No Phone 
    const noPhone = document.getElementById('no-phone')
    if (phones.length === 0){
        noPhone.classList.remove('d-none');   
    }
    else
     {
        noPhone.classList.add('d-none');   
    }
    
// Display All Phones
    for(const phone of phones){
        const phoneDiv = document.createElement('div')
       phoneDiv.classList.add('col')
       phoneDiv.innerHTML = `
        <div class="card px-4 pt-4 mb-4 border border-3 rounded border-success">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
            </div>
        </div>
        `;
       phoneContainer.appendChild(phoneDiv);
    }
    toggleSpinner(false);
}

const processSearch =(dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText= searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);

searchField.value = "";
})
// Search by Enter Button Press 
document.getElementById('search-field').addEventListener('keypress', function (e) {
// console.log(e.key);
if (e.key === 'Enter') {
    processSearch(10);
}

});

// Spinner Loading 
const toggleSpinner = loading =>{

    const loaderSection = document.getElementById('loader');

    if(loading){

        loaderSection.classList.remove('d-none')
    }
    else
    {
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch();

})

const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);  
}

const displayPhoneDetails= phone =>{
    console.log(phone);  
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <h5><b>Model:</b> ${phone.slug ? phone.slug : 'No Model Found'}</h5>
        <p> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></p>
        <p><b>Released Date:</b> ${phone.releaseDate ? phone.releaseDate : 'No Released Date Found'}</p>
        <p><b>ChipSet:</b> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No ChipSet Information Found'}</p>
        <p><b>Display:</b> ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No Display Information Found'}</p>
        <p><b>Sensors:</b> ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'No Sensor Information Found'}</p>
        <p><b>Bluetooth:</b> ${phone.others.Bluetooth ? phone.others.Bluetooth : 'No Bluetooth Information Found'}</p>

    `;
}

loadPhones('ipad');
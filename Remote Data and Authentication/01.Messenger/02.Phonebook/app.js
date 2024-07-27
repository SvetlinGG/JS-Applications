function attachEvents(){

    document.getElementById('btnLoad').addEventListener('click',loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    list.addEventListener('click', onDelete);

    loadContacts();
    
}
const list = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');
attachEvents()

async function onDelete(event){
    const id = event.target.dataset.id;
    if( id != undefined){
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}

async function onCreate(){
    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = {person, phone};

    const result = await createContact(contact);

    list.appendChild(createItem(result));

}

async function loadContacts(){
    const res = await fetch("http://localhost:3030/jsonstore/phonebook");
    const data = await res.json();
    list.replaceChildren(...Object.values(data).map(createItem));
    ;


    
}
function createItem(contact){
    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone}<button data-id="${contact._id}">Delete</button>`;
    return liElement;
}

async function createContact(contact){
    const res = await fetch("http://localhost:3030/jsonstore/phonebook", {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(contact)
    });
    const result = await res.json();

    return result;
}

async function deleteContact(id){
    const res = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete',
    });
    const result = await res.json();
    return result;
}


/*
function attachEvents() {

    const btnLoad = document.getElementById('btnLoad').addEventListener('click', onLoad);
    const btnCreate = document.getElementById('btnCreate').addEventListener('click', onCreate);
    const phoneList = document.getElementById('phonebook').addEventListener('click', handlePhones);
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    const endpoints ={
        base: "http://localhost:3030/jsonstore/phonebook",
        catalog(id) {
            return `${this.base}/${id}`
        },
    };

    async function onLoad(){

    }

    async function onCreate(){

    }

    async function handlePhones(){

    }
}

attachEvents();
*/



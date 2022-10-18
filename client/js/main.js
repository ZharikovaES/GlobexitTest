function ready() {
    const URL_API = "http://127.0.0.1:3000";

    const cardTemplate = document.querySelector("#card-template");
    const cardsMessage = document.querySelector(".cards__message");
    const popUpOfCard = document.querySelector("#pop-up-info-card");
    const titlePopUpOfCard = popUpOfCard.querySelector(".pop-up__title");
    const phonePopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--phone");
    const mailPopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--mail");
    const hireDatePopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--hire-date");
    const positionPopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--position");
    const departmentPopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--department");
    const addressPopUpOfCard = popUpOfCard.querySelector(".pop-up__value--address");
    const searchForm = document.querySelector("form[name=search-form]");

    const cardsList = document.querySelector(".cards__list");

    // получение и отображение данных о пользователях при загрузке страницы
    fetch(URL_API)
        .then(handleError)
        .then(data => {
            setUsersToCards(data);
        })
        .catch(err => {
            showMessage(err?.message);
        });

    // получение и отображение данных о пользователях при поисковом запросе
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const value = this["name-input"].value;

        
        fetch(URL_API + "?" + new URLSearchParams({ term: value ?? "" }))
            .then(handleError)
            .then(data => {
                setUsersToCards(data);
            })
            .catch(err => {
                showMessage(err?.message);
            });
            
    });
    
    //размещение данных в DOM
    function setUsersToCards(data) {
        if (Array.isArray(data)) {
            console.log(data);
            if (data.length) {
                cardsList.innerHTML = "";
                data.forEach(el => {
                    const card = cardTemplate.content.cloneNode(true);
                    card.querySelector(".card__title").innerText = el.name;
                    card.querySelector(".item-info-card__phone").innerText = el.phone;
                    card.querySelector(".item-info-card__mail").innerText = el.email;
                    const btnOfCard = card.querySelector(".card__btn");
                    
                    btnOfCard.addEventListener("click", function(e){
                        titlePopUpOfCard.innerText = el.name; 
                        phonePopUpOfCard.innerText = el.phone;
                        mailPopUpOfCard.innerText = el.email;
                        hireDatePopUpOfCard.innerText = el.hire_date;
                        positionPopUpOfCard.innerText = el.position_name;
                        departmentPopUpOfCard.innerText = el.department;
                        addressPopUpOfCard.innerText = el.address;
                    });
    
                    cardsList.append(card);
                });
                cardsList.style.display = "block";
                cardsMessage.style.display = "none";
            } else showMessage("Список пуст");
        }
    }

    // обработка ошибок
    function handleError(res) {
        if (!res.ok) throw new Error('Что-то пошло не так...');
        return res.json();            
    }

    // демонстрация сообщения
    function showMessage(message) {
        cardsList.innerHTML = "";
        cardsList.style.display = "none";
        cardsMessage.style.display = "block";
        cardsMessage.innerText = message;
    }
}

window.addEventListener("DOMContentLoaded", ready);

document.addEventListener("load", () => {
    document.body.classList.remove("preload");
});


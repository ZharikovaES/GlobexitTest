function ready() {
    const URL_API = "http://127.0.0.1:3000";

    const cardTemplate = document.querySelector("#card-template");
    const cardsMessageWrapper = document.querySelector(".cards__wrapper-message");
    const cardsMessage = document.querySelector(".cards__message");
    const popUpOfCard = document.querySelector("#pop-up-info-card");
    const popUpWrapper = popUpOfCard.querySelector(".pop-up__wrapper");
    const popUpBtnClose = popUpOfCard.querySelector(".pop-up__btn-close");
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

    // возвращение скролла у body при закрытии pop-up-а
    [popUpWrapper, popUpBtnClose].forEach(el => {
        el.addEventListener("click", () => {
            document.body.style.overflow = null;
        });
    });
    
    //размещение данных в DOM
    function setUsersToCards(data) {
        if (Array.isArray(data)) {
            if (data.length) {
                cardsList.innerHTML = "";
                data.forEach(el => {
                    const card = cardTemplate.content.cloneNode(true);
                    card.querySelector(".card__title").innerText = el.name;
                    card.querySelector(".item-info-card__phone").innerText = el.phone;
                    card.querySelector(".item-info-card__mail").innerText = el.email;
                    const btnOfCard = card.querySelector(".card__btn");
                    
                    //обработка события нажатия на карточку
                    btnOfCard.addEventListener("click", function(e){
                        const body = document.body;
                        if (body.style.overflow) body.style.overflow = null;
                        else body.style.overflow = "hidden";

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
                cardsList.style.display = null;
                cardsMessageWrapper.style.display = "none";
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
        cardsMessageWrapper.style.display = "block";
        cardsMessage.innerText = message;
    }
}

window.addEventListener("DOMContentLoaded", ready);

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});


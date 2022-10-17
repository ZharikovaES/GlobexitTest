function ready() {
    const URL_API = "http://127.0.0.1:3000";

    const cardTemplate = document.querySelector("#card-template");
    const cardsInner = document.querySelector(".cards__inner");
    const cardsMessage = document.querySelector(".cards__message");
    const popUpOfCard = document.querySelector("#pop-up-info-card");
    const titlePopUpOfCard = popUpOfCard.querySelector(".pop-up__title");
    const phonePopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--phone");
    const mailPopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--mail");
    const hireDatePopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--hire-date");
    const positionPopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--position");
    const departmentPopUpOfCard = popUpOfCard.querySelector(".info-pop-up__value--department");
    const addressPopUpOfCard = popUpOfCard.querySelector(".pop-up__value--address");

    const ul = document.createElement("ul");
    ul.className = "cards__list";

    // получение и отображение данных о пользователях при загрузке страницы
    fetch(URL_API).then(res => res.json())
                    .then(data => {
                        if (Array.isArray(data))
                            data.forEach((el, index) => {
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

                                ul.append(card);
                            });
                        cardsInner.prepend(ul);
                        cardsMessage.style.display = "none";
                    });

}

window.addEventListener("DOMContentLoaded", ready);

document.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
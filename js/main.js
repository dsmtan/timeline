"use strict";

window.onload = function() {
  //fetch json
  fetch("js/phones.json")
    .then(res => res.json())
    .then(phonedata => {
      showPhones(phonedata);
    });
};

const template = document.querySelector("#phonetemplate").content;
const wrapper = document.querySelector(".div--wrapper");

function showPhones(phonedata) {
  phonedata.forEach(phone => {
    const copy = template.cloneNode(true);
    copy.querySelector("article").id = phone.id;
    copy.querySelector(".p--year").textContent = phone.year;
    copy.querySelector(".p--year").classList.add(`year--${phone.id}`);

    copy.querySelector(".div--data").classList.add(`data--${phone.id}`);

    copy.querySelector(".phone--image").src = phone.image;
    copy.querySelector("h2").textContent = phone.name;
    copy.querySelector(".descriptiontext").textContent = phone.description;
    copy.querySelector(".phone--circle").style.borderColor = phone.color;
    copy.querySelector(".phone--description").style.backgroundColor =
      phone.color;

    wrapper.appendChild(copy);
  });

  //addeventlisteners
  initListeners();
}

function initListeners() {
  document.addEventListener(
    "click",
    function(event) {
      if (event.target.classList.contains("p--year")) {
        yearClicked(event);
      }
    },
    false
  );
}

function yearClicked(event) {
  console.log(event.target);
  event.target.parentNode.classList.add("selected--year");
  let oldTarget = event.target;

  //user clicks on different year
  document.addEventListener(
    "click",
    function(event) {
      if (event.target.classList.contains("p--year")) {
        if (event.target !== oldTarget) {
          oldTarget.parentNode.classList.remove("selected--year");
        }
      }
    },
    false
  );
}

//add class selected--year to parentnode of event.target

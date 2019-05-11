"use strict";

window.onload = function() {
  //fetch data from json
  fetch("js/phones.json")
    .then(res => res.json())
    .then(phonedata => {
      showPhones(phonedata);
    });
};

const template = document.querySelector("#phonetemplate").content;
const wrapper = document.querySelector(".div--wrapper");

function showPhones(phonedata) {
  //create an article for each phone in the JSON-file from template
  phonedata.forEach(phone => {
    const copy = template.cloneNode(true);
    copy.querySelector("article").id = phone.id;
    copy.querySelector(".p--year").textContent = phone.year;
    copy.querySelector(".phone--image").src = phone.image;
    copy.querySelector("h2").textContent = phone.name;
    copy.querySelector(".descriptiontext").textContent = phone.description;
    copy.querySelector(".phone--circle").style.borderColor = phone.color;
    copy.querySelector(".phone--description").style.backgroundColor =
      phone.color;

    //append article to wrapper
    wrapper.appendChild(copy);
  });

  //add eventlisteners for all year numbers
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
  //add class selected--year to parentnode to start animations
  event.target.parentNode.classList.add("selected--year");
  let oldTarget = event.target;

  moveCircle(event.target);

  //remove class when user clicks on different year
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

const svg = document.querySelector("svg");
const timeCircle = document.querySelector("#movingcircle");

function moveCircle(targetedevent) {
  //set new position of circle according to year clicked
  let newPosition = targetedevent.offsetTop - 210;
  timeCircle.style.transform = `translateY(${newPosition}px)`;
}

'use strict';

const stepNums = document.querySelectorAll('.stepNum');
const mainConts = document.querySelectorAll('.main');
const timeToggle = document.getElementById('planTime');
const monthly = document.getElementById('monthly');
const yearly = document.querySelector('.yearly');
const plans = document.querySelectorAll('.planOption');
const prices = document.querySelectorAll('.planPrice');
const free = document.querySelectorAll('.free');
const addons = document.querySelectorAll('.addOnOption');
const changePlan = document.querySelector('.changePlan');

const next2 = document.getElementById('next2');
const next3 = document.getElementById('next3');

let state = {
  time: 'Monthly',
  selectedAddons: [],
};

stepNums.forEach((num) => {
  num.addEventListener('click', () => {
    stepNums.forEach((num) => {
      num.classList.remove('activeNum');
    });
    num.classList.toggle('activeNum');
    mainConts.forEach((cont) => {
      cont.style.display = 'none';
    });
    let contID = num.textContent - 1;
    mainConts[contID].style.display = 'flex';
    mainConts[contID].style.animation =
      'container 700ms ease 0s 1 normal forwards';
  });
});

// activeTime;
console.log(timeToggle.checked);
timeToggle.addEventListener('change', () => {
  timeToggle.checked
    ? (monthly.style.color = '#9699ab')
    : (monthly.style.color = '#02295a');

  timeToggle.checked
    ? (prices[0].textContent = '$90/yr')
    : (prices[0].textContent = '$9/yr');
  timeToggle.checked
    ? (prices[1].textContent = '$120/yr')
    : (prices[1].textContent = '$12/yr');
  timeToggle.checked
    ? (prices[2].textContent = '$150/yr')
    : (prices[2].textContent = '$15/yr');

  if (timeToggle.checked) {
    free.forEach((txt) => {
      txt.style.display = 'block';
    });
    monthly.classList.remove('activeTime');
    yearly.classList.add('activeTime');
    state.time = 'Yearly';
  } else {
    free.forEach((txt) => {
      txt.style.display = 'none';
    });
    monthly.classList.add('activeTime');
    yearly.classList.remove('activeTime');
    state.time = 'Monthly';
  }
});

plans.forEach((plan) => {
  plan.addEventListener('click', () => {
    plans.forEach((plan) => plan.classList.remove('activePlan'));
    plan.classList.add('activePlan');
  });
});

addons.forEach((option) => {
  option.addEventListener('click', () => {
    const check = option.querySelector('input');
    if (check.checked === false) {
      check.checked = true;
      check.disabled = false;
      option.classList.add('activePlan');
      option.classList.add('selectedAddon');
    } else {
      check.checked = false;
      check.disabled = true;

      option.classList.remove('activePlan');
      option.classList.remove('selectedAddon');
    }
  });
});

changePlan.addEventListener('click', () => {
  mainConts.forEach((cont) => {
    cont.style.display = 'none';
  });
  mainConts[2].style.display = 'flex';
  mainConts[2].style.animation = 'container 700ms ease 0s 1 normal forwards';
  stepNums.forEach((step) => step.classList.remove('activeNum'));
  stepNums[2].classList.add('activeNum');
});

function nextStep() {
  let selectedPlan = document.querySelector('.activePlan');
  let selectedAddons = document.querySelectorAll('.selectedAddon');
  let selectedPlanName = selectedPlan.querySelector('.planTitle').textContent;
  let planPrice = selectedPlan.querySelector('.planPrice').textContent;
  state.planPrice = planPrice;
  state.selectedPlan = selectedPlanName;
  selectedAddons.forEach((add) => {
    let addonName = add.querySelector('h3').textContent;
    let addonPrice = add.querySelector('.addOnPrice').textContent;

    if (!state.selectedAddons.includes(addonName)) {
      //if the addon is not selected log it to the state, otherwise skip it
      let addon = {
        addonName: addonName,
        addonPrice: addonPrice,
      };

      state.selectedAddons.push(addon);
    }
  });
}

next2.addEventListener('click', () => {
  nextStep();
  console.log(state);
});

next3.addEventListener('click', () => {
  state.selectedAddons = [];
  nextStep();
  console.log(...state.selectedAddons);
});

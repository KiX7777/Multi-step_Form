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
const addonsSummary = document.querySelector('.addonsSummary');
const chosenPlan = document.querySelector('.chosenPlan');
const chosenPrice = document.querySelector('.chosenPrice');
const nextBtns = document.querySelectorAll('.nextBtn');
const gobackBtns = document.querySelectorAll('.gobackBtn');
const next1 = document.getElementById('next1');
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
      cont.classList.remove('activeStep');
    });
    let contID = num.textContent - 1;
    mainConts[contID].style.display = 'flex';
    mainConts[contID].style.animation =
      'container 700ms ease 0s 1 normal forwards';
    mainConts[contID].classList.add('activeStep');
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
  addonsSummary.innerHTML = ``;
  state.selectedAddons = [];
  let selectedPlan = document.querySelector('.activePlan');
  let selectedAddons = document.querySelectorAll('.selectedAddon');
  let selectedPlanName = selectedPlan.querySelector('.planTitle').textContent;
  let planPrice = selectedPlan.querySelector('.planPrice').textContent;
  state.planPrice = planPrice;
  state.selectedPlan = selectedPlanName;
  let chosenPlanName = chosenPlan.querySelector('h3');
  chosenPlanName.textContent = `${state.selectedPlan}(${state.time})`;
  // chosenPlan.style.fontSize = '1.4rem';
  // chosenPlan.style.fontWeight = '700';
  // chosenPlan.style.color = '#02295a';

  chosenPrice.textContent = state.planPrice;
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

    addonsSummary.innerHTML += ` 
    <div class="chosenAddon">
      <p class="chosenAddonName">${addonName}</p>
      <p class="chosenAddonPrice">${addonPrice}</p>
  </div>`;
  });
}

next2.addEventListener('click', () => {
  nextStep();
  console.log(state);
});

next3.addEventListener('click', () => {
  nextStep();
  console.log(...state.selectedAddons);
});

function switchtoNextStep() {
  let num = document.querySelector('.activeNum');
  let contID = num.textContent;
  mainConts.forEach((cont) => {
    cont.style.display = 'none';
    cont.classList.remove('activeStep');
  });
  mainConts[contID].style.display = 'flex';
  mainConts[contID].style.animation =
    'container 700ms ease 0s 1 normal forwards';
  mainConts[contID].classList.add('activeStep');
  console.log(contID);
  stepNums.forEach((num) => {
    num.classList.remove('activeNum');
  });
  // num.classList.toggle('activeNum');
  stepNums[contID].classList.add('activeNum');
}

// next1.addEventListener('click', switchtoNextStep);
// next2.addEventListener('click', switchtoNextStep);

nextBtns.forEach((btn) => {
  btn.addEventListener('click', switchtoNextStep);
});

function goBack() {
  let num = document.querySelector('.activeNum');
  let contID = num.textContent - 1;
  mainConts.forEach((cont) => {
    cont.style.display = 'none';
    cont.classList.remove('activeStep');
  });
  mainConts[contID - 1].style.display = 'flex';
  mainConts[contID - 1].style.animation =
    'container 700ms ease 0s 1 normal forwards';
  mainConts[contID - 1].classList.add('activeStep');
  console.log(contID);
  stepNums.forEach((num) => {
    num.classList.remove('activeNum');
  });
  // num.classList.toggle('activeNum');
  stepNums[contID - 1].classList.add('activeNum');
}

gobackBtns.forEach((btn) => {
  btn.addEventListener('click', goBack);
});

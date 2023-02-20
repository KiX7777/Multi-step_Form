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
const inputs = document.querySelectorAll('.personalForm input');
const form = document.querySelectorAll('.personalForm ');
const nextBtns = document.querySelectorAll('.nextBtn');
const gobackBtns = document.querySelectorAll('.gobackBtn');
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const next3 = document.getElementById('next3');
const totalPrice = document.querySelector('.totalPrice');
const totaltext = document.querySelector('.totaltext');
const confirmBtn = document.querySelector('.confirm');
const thankyou = document.getElementById('end');

let state = {
  time: 'Monthly',
  selectedAddons: [],
};

stepNums.forEach((num) => {
  num.addEventListener('click', () => {
    if (
      !inputs[0].validity.valid ||
      !inputs[2].validity.valid ||
      !inputs[2].validity.valid
    ) {
      return;
    } else {
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
      nextStep();
    }
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
  mainConts[1].style.display = 'flex';
  mainConts[1].style.animation = 'container 700ms ease 0s 1 normal forwards';
  stepNums.forEach((step) => step.classList.remove('activeNum'));
  stepNums[1].classList.add('activeNum');
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

  chosenPrice.textContent = state.planPrice;
  selectedAddons.forEach((add) => {
    let addonName = add.querySelector('h3').textContent;
    let addonPrice = add.querySelector('.addOnPrice').textContent;

    let addonprice = parseInt(addonPrice.slice(2));
    if (!state.selectedAddons.includes(addonName)) {
      //if the addon is not selected log it to the state, otherwise skip it
      if (state.time === 'Yearly') {
        let addon = {
          addonName: addonName,
          addonPrice: addonprice * 12,
        };
        state.selectedAddons.push(addon);
      } else {
        let addon = {
          addonName: addonName,
          addonPrice: addonprice,
        };
        state.selectedAddons.push(addon);
      }
    }

    if (state.time === 'Yearly') {
      addonsSummary.innerHTML += ` 
     <div class="chosenAddon">
      <p class="chosenAddonName">${addonName}</p>
      <p class="chosenAddonPrice">+$${addonprice * 12}/yr</p>
  </div>`;
    } else {
      addonsSummary.innerHTML += ` 
    <div class="chosenAddon">
      <p class="chosenAddonName">${addonName}</p>
      <p class="chosenAddonPrice">${addonPrice}</p>
  </div>`;
    }
  });

  // state.totalPrice =

  state.time === 'Monthly'
    ? (totaltext.textContent = `Total (per month)`)
    : (totaltext.textContent = `Total (per year)`);

  let summaryPrices = [];
  let chosenPlanPrice = parseInt(chosenPrice.textContent.slice(1));
  summaryPrices.push(chosenPlanPrice);
  state.selectedAddons.forEach((add) => {
    summaryPrices.push(add.addonPrice);
  });

  let summary = summaryPrices.reduce((total, num) => {
    return total + num;
  });

  console.log(summaryPrices);
  totalPrice.textContent = `$${summary}/${
    state.time === 'Monthly' ? 'mo' : 'yr'
  }`;
}
-next2.addEventListener('click', () => {
  nextStep();
  console.log(state);
});

next3.addEventListener('click', () => {
  nextStep();
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
  btn.addEventListener('click', () => {
    if (
      !inputs[0].validity.valid ||
      !inputs[2].validity.valid ||
      !inputs[2].validity.valid
    ) {
      return;
    } else {
      switchtoNextStep();
    }
  });
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

confirmBtn.addEventListener('click', () => {
  mainConts.forEach((cont) => {
    cont.style.display = 'none';
    cont.classList.remove('activeStep');
  });
  console.log(end);
  end.style.visibility = 'visible';
  end.style.animation = 'end 500ms ease 0s 1 normal forwards';
  stepNums.forEach((num) => {
    num.classList.remove('activeNum');
    num.style.pointerEvents = 'none';
  });
});

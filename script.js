'use strict';

const stepNums = document.querySelectorAll('.stepNum');
const mainConts = document.querySelectorAll('.main');
const timeToggle = document.getElementById('planTime');
const monthly = document.getElementById('monthly');
const plans = document.querySelectorAll('.planOption');
const prices = document.querySelectorAll('.planPrice');
const free = document.querySelectorAll('.free');
const addons = document.querySelectorAll('.addOnOption');

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
  } else {
    free.forEach((txt) => {
      txt.style.display = 'none';
    });
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
    } else {
      check.checked = false;
      check.disabled = true;

      option.classList.remove('activePlan');
    }
  });
});

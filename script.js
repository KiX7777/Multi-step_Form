'use strict';

const stepNums = document.querySelectorAll('.stepNum');

stepNums.forEach((num) => {
  num.addEventListener('click', () => {
    stepNums.forEach((num) => {
      num.classList.remove('activeNum');
    });
    num.classList.toggle('activeNum');
  });
});

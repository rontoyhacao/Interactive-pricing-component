const pricingSlider = document.querySelector('.progress-bar');

// input
const pricingInput = {
    el: pricingSlider.querySelector('.slider'),
};
pricingInput.data = JSON.parse(pricingInput.el.dataset.priceInput);
pricingInput.currentValEl = document.querySelector('.pageviews');

//output
const pricingOutputEl = document.querySelector('.price');
const pricingOutput = {};

pricingOutput.currency = pricingOutputEl.querySelector('.price-currency');
pricingOutput.amount = pricingOutputEl.querySelector('.price-amount');
pricingOutput.month = pricingOutputEl.querySelector('.price-month');
pricingOutput.data = JSON.parse(pricingOutputEl.dataset.priceInput);

// discount
const toggleBilling = document.querySelector('.toggle-btn input');
// set value for discount and discount calculation to display
const discountHTML = 25;
const discountPercentage = discountHTML * 0.01;
const yearlyBilling = document.querySelector('.yearly-billing');
yearlyBilling.setAttribute('data-discount', discountHTML);

// check billing input
let stateBilling = 0;
function checkBilling() {
    if (toggleBilling.checked) {
        stateBilling= 1;
    } else {
        stateBilling = 0;
    }
}
toggleBilling.addEventListener('input', () => {
    checkBilling();
    handlePricingSlider(pricingInput, pricingOutput);
});

// bind input to output
function handlePricingSlider(input, output) {
    // output value progress
    if (input.currentValEl) {
        input.currentValEl.innerHTML = input.data[input.el.value];
    }
    // update prices
    if (output.currency) {
        output.currency.innerHTML = output.data[input.el.value][0];
    }
    if (output.amount && stateBilling == 0) {
        output.amount.innerHTML = output.data[input.el.value][1];
    } else if (output.amount && stateBilling == 1) {
        output.amount.innerHTML = output.data[input.el.value][1] - output.data[input.el.value][1] * discountPercentage;
    }
    if (output.month) {
        output.month.innerHTML = output.data[input.el.value][2];
    }
}
handlePricingSlider(pricingInput, pricingOutput);

pricingSlider.addEventListener('input', () => {
    handlePricingSlider(pricingInput, pricingOutput);
});

// slider progress color
document.querySelector('.slider').oninput = function () {
    var value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background =
      'linear-gradient(to right, hsl(174, 76%, 80%) 0%, hsl(174, 76%, 80%) ' +
      value +
      '%, hsl(224, 65%, 95%) ' +
      value +
      '%, hsl(224, 65%, 95%) 100%)';
  };
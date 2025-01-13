
let mortgageForm = document.getElementById('mortgageForm');

let {mortgageAmount, mortgageTerm, interestRate, radio} = mortgageForm
let calculateButtonElem = document.querySelector(".calculate-button")

function formatCurrency(amount) {
    return (Number(amount)).toFixed(2)
}

function mortgageCalculator(principal, rate, time, mortgageType="repayment") {
  let monthlyRepayment = 0;
  let totalRepayment = 0;
  
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = time * 12;

  monthlyRepayment = formatCurrency(principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
  totalRepayment = formatCurrency(monthlyRepayment * numberOfPayments);
  if (mortgageType == 'interest-rate'){
    monthlyRepayment = formatCurrency((principal * rate) / 100 / 12);
    totalRepayment = formatCurrency(parseInt(principal) + monthlyRepayment * numberOfPayments);
    
  }
  return `
  <>
    <div>
      <p>Your monthly repayments</p>
      <div class="monthly-repayments">$${monthlyRepayment}</div>
    </div>
    <div class="division-line"></div>
    <div>
      <p>Total you'll repay over the term</p>
      <div class="total-repayments">$${totalRepayment}</div>
    </div>
  </>
  `
}

calculateButtonElem.addEventListener('click', () => {
  if(radio.value == "repayment") {
    document.querySelector(".actual-result-display").innerHTML = mortgageCalculator(
      mortgageAmount.value,
      interestRate.value,
      mortgageTerm.value
    )
  }
  else {
    document.querySelector(".actual-result-display").innerHTML = mortgageCalculator(
      mortgageAmount.value,
      interestRate.value,
      mortgageTerm.value,
      "interest-rate"
    )
  }
  
  // console.log(document.querySelector(".actual-result-display"))

})


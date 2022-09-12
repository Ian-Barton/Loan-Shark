function getValues() {
    let loan = document.getElementById("loan").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;

    if (Number.isNaN(loan) && Number.isNaN(term) && Number.isNaN(rate)) {
        alert("You must enter integers only.");
    }else{
        let fbArray = calculate(loan, term, rate);
        display(fbArray);
    }
}

function calculate(loan, term, rate) {
    let monthly_payment_1 = (loan) * (rate / 1200) // / 1- 1+rate/1200 ^-term;
    let monthly_payment_2 = (1 -( 1 + rate / 1200)**(-term));

    let monthly_exponent = monthly_payment_1 / monthly_payment_2;
    let remaining_balance = loan;
    let interest_payment_1 = remaining_balance;;
    let interest_payment_2 = rate / 1200;;
    let interest_total = interest_payment_1 * interest_payment_2;
    let total_interest = 0;
    let principal_payment;

    let returnArray = [];
    let returnObject = {};

    for (let i = 1; i <= term; i++) {

        interest_payment_1 = remaining_balance;
        interest_payment_2 = rate / 1200;
        interest_total = interest_payment_1 * interest_payment_2;
        principal_payment = monthly_exponent - interest_total;
        total_interest += interest_total;
        principal_payment = monthly_exponent - interest_total;
        remaining_balance -= principal_payment;
        
        returnArray.push(i);
        returnArray.push(monthly_exponent.toFixed(2));
        returnArray.push(principal_payment.toFixed(2));
        returnArray.push(interest_total.toFixed(2));
        returnArray.push(total_interest.toFixed(2));
        returnArray.push(remaining_balance.toFixed(2));
        
        returnObject.month = monthly_exponent;
        returnObject.interest = total_interest;
        returnObject.principal = principal_payment;
    }
    returnObject.array = returnArray;
    return returnObject;
}

function display(fbArray) {
    let tableBody = document.getElementById("results");

    let rowTemplate = document.getElementById("fbTemplate");

    tableBody.innerHTML = "";

    for (let i = 0; i < fbArray.length; i += 6) {
        let tableRow = document.importNode(rowTemplate.content, true);
        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = fbArray.array[i];
        rowCols[1].textContent = fbArray.array[i + 1];
        rowCols[2].textContent = fbArray.array[i + 2];
        rowCols[3].textContent = fbArray.array[i + 3];
        rowCols[4].textContent = fbArray.array[i + 4];
        rowCols[5].textContent = fbArray.array[i + 5];
        tableBody.appendChild(tableRow);
    }
}
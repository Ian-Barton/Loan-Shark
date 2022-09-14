function getValues() {
    let loan = document.getElementById("loan").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;

    if (Number.isNaN(loan) && Number.isNaN(term) && Number.isNaN(rate)) {
        alert("You must enter integers only.");
    }else{
        let returnObject = calculate(loan, term, rate);
        display(returnObject);
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
        returnObject.interest = total_interest.toFixed(2);
        returnObject.principal = loan;
        returnObject.month = monthly_exponent.toFixed(2);
    }
    returnObject.ar = returnArray;
    return returnObject;
}

function display(returnObject) {
    let tableBody = document.getElementById("results");

    let rowTemplate = document.getElementById("fbTemplate");
    tableBody.innerHTML = "";
    document.getElementById("principal").innerHTML = "";
    document.getElementById("interest").innerHTML = "";
    document.getElementById("cost").innerHTML = "";
    document.getElementById("month").innerHTML = "";

    let principal = returnObject.principal;
    let interest = returnObject.interest;
    let cost = parseFloat(principal) + parseFloat(interest);

    for (let i = 0; i < returnObject.ar.length; i += 6) {
        let tableRow = document.importNode(rowTemplate.content, true);
        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = returnObject.ar[i];
        rowCols[1].textContent = returnObject.ar[i + 1];
        rowCols[2].textContent = returnObject.ar[i + 2];
        rowCols[3].textContent = returnObject.ar[i + 3];
        rowCols[4].textContent = returnObject.ar[i + 4];
        rowCols[5].textContent = returnObject.ar[i + 5];
        tableBody.appendChild(tableRow);
    }
    document.getElementById("month").innerHTML = returnObject.month;
    document.getElementById("principal").innerHTML = principal;
    document.getElementById("interest").innerHTML = interest;
    document.getElementById("cost").innerHTML =  cost;
}
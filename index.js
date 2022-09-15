const confirmBtn = document.querySelector('.confirm-btn');
const form = document.querySelector('form');
const inputField = document.querySelectorAll('.input-field');
const realtimeText = document.querySelectorAll('.realtime-text');
const completeState = document.querySelector('.complete-state');
const resetBtn = document.querySelector('.reset-btn');
const numberInput = document.getElementById('card-number');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const nameInput = document.getElementById('cardholder-name');
const cvcInput = document.getElementById('cvc');
let count = 0;
let numberPattern = /^(?:[0-9]{4}) (?:[0-9]{4}) (?:[0-9]{4}) (?:[0-9]{4})$/;
let alphCheck = /[a-zA-Z]/

const defTextArr = Array.from(realtimeText)

const defValue = defTextArr.reduce(function (acc, text) {
    return acc.concat(text.textContent);
}, []);

resetBtn.addEventListener('click', function () {
    inputField.forEach(function (field) {
        field.value = "";
    });
    realtimeText.forEach(function (text, index) {
        text.textContent = defValue[index];
    });
    form.style.display = "block";
    completeState.classList.remove("complete-message");
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    inputField.forEach(function (field) {
        checkBlank(field);
    });

    if (monthInput.value > 12 || monthInput.value < 1) {
        monthInput.parentElement.classList.add("wrong-month");
    } else {
        monthInput.parentElement.classList.remove("wrong-month");
    }

    checkAlp(monthInput);
    checkAlp(yearInput);


    if (yearInput.value < 1 && yearInput.value !== "") {
        yearInput.parentElement.classList.add("wrong-year");
    } else {
        yearInput.parentElement.classList.remove("wrong-year");
    }

    if (cvcInput.value.length < 3 && cvcInput.value !== "") {
        cvcInput.parentElement.classList.add("cvc-format");
    } else {
        cvcInput.parentElement.classList.remove("cvc-format");
        checkAlp(cvcInput);
    }


    inputField.forEach(function (field) {
        const fieldParent = field.parentElement;
        if (!fieldParent.classList.contains("wrong-format") && !fieldParent.classList.contains("blank-alert") &&
            !fieldParent.classList.contains("wrong-month")) {
            count++;
        }
    });

    if (count === 5) {
        form.style.display = "none";
        completeState.classList.add("complete-message");
    }
    count = 0;
})

function checkBlank(item) {
    if (item.value === "") {
        item.parentElement.classList.add("blank-alert");
    } else {
        item.parentElement.classList.remove("blank-alert");
    }
}

function checkAlp(item) {
    if (alphCheck.test(item.value)) {
        item.parentElement.classList.add("wrong-format");
    } else {
        item.parentElement.classList.remove("wrong-format");
    }
}

numberInput.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
});


inputField.forEach(function (field) {
    field.addEventListener('input', function (e) {
        const inputId = e.currentTarget.id;
        const fieldValue = e.currentTarget.value;
        realtimeText.forEach(function (value, index) {
            const valueId = value.dataset.id;
            if (valueId == inputId) {
                if (inputId === "month" || inputId === "year") {
                    if (fieldValue < 10 && fieldValue > 0) {
                        value.textContent = `0${fieldValue}`;
                    } else {
                        value.textContent = fieldValue;
                    }
                } else {
                    value.textContent = fieldValue;
                }
            }
            if (value.textContent === "") {
                value.textContent = defValue[index];
            }
        });
    });
});




const confirmBtn = document.querySelector('.confirm-btn');
const form = document.querySelector('form');
const inputField = document.querySelectorAll('.input-field');
const realtimeText = document.querySelectorAll('.realtime-text');
const completeState = document.querySelector('.complete-state');
const resetBtn = document.querySelector('.reset-btn');
let count = 0;

resetBtn.addEventListener('click', function (e) {
    inputField.forEach(function (field) {
        field.value = "";
    });
    realtimeText.forEach(function (text, index) {
        text.textContent = defValue[index];
    });
    form.style.display ="block";
    completeState.classList.remove("complete-message");
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    inputField.forEach(function (field) {
        const fieldId = field.id;
        const fieldParent = field.parentElement;
        const fieldGrandparent = fieldParent.parentElement;
        if (fieldId === "cardholder-name") {
            checkBlank(field)
        } else {
            checkBlank(field);
            checkFormat(field);
        }
        if (!fieldParent.classList.contains("wrong-format") && !fieldParent.classList.contains("blank-alert") &&
            !fieldGrandparent.classList.contains("wrong-format") && !fieldGrandparent.classList.contains("blank-alert")) {
            count++;
        }
        console.log(count);
    });
    if (count === 5) {
        form.style.display = "none";
        completeState.classList.add("complete-message");
    }
    count = 0;
})

function checkBlank(item) {
    if (item.id === "month" || item.id === "year") {
        if (item.value === "") {
            item.parentElement.parentElement.classList.add("blank-alert");
        } else {
            item.parentElement.parentElement.classList.remove("blank-alert");
        }
    } else {
        if (item.value === "") {
            item.parentElement.classList.add("blank-alert");
        } else {
            item.parentElement.classList.remove("blank-alert");
        }
    }

}

function checkFormat(item) {
    if (item.id === "month" || item.id === "year") {
        if (isNaN(item.value)) {
            item.parentElement.parentElement.classList.add("wrong-format");
        } else {
            item.parentElement.parentElement.classList.remove("wrong-format");
        }
    } else {
        if (isNaN(item.value)) {
            item.parentElement.classList.add("wrong-format");
        } else {
            item.parentElement.classList.remove("wrong-format");
        }
    }
}

const defTextArr = Array.from(realtimeText)

const defValue = defTextArr.reduce(function (acc, text) {
    return acc.concat(text.textContent);
}, []);

inputField.forEach(function (field) {
    field.addEventListener('input', function (e) {
        const inputId = e.currentTarget.id;
        const fieldValue = e.currentTarget.value;
        realtimeText.forEach(function (value, index) {
            const valueId = value.dataset.id;
            if (valueId === inputId) {
                if (inputId === "card-number") {
                    value.textContent = fieldValue.match(/.{1,4}/g).join(" ");
                    if (value.textContent.length === 1) {
                        value.textContent = defValue[index];
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




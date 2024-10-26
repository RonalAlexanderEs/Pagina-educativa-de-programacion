const form = document.querySelector("form"),
    nextBtn = document.querySelector(".nextBtn"),
    backBtn = document.querySelector(".backBtn"),
    allInput = document.querySelectorAll(".first input, .first select");

nextBtn.addEventListener("click", () => {
    let allFilled = true;

    allInput.forEach(input => {
        if (input.value === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        form.classList.add('secActive');
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

backBtn.addEventListener("click", () => {
    form.classList.remove('secActive');
});
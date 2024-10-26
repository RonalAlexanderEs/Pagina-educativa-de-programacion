document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('.payment-option');

    function renderPaymentForm(option, contentElement) {
        let formHTML = '';
        switch(option) {
            case 'card':
                formHTML = `
                    <input type="text" placeholder="Número de documento de identidad">
                    <input type="text" placeholder="Nombre titular de la tarjeta">
                    <input type="text" placeholder="Número de tarjeta">
                    <div style="display: flex; justify-content: space-between;">
                        <input type="text" placeholder="MM / AA" style="width: 48%;">
                        <input type="text" placeholder="CVV" style="width: 48%;">
                    </div>
                    <select>
                        <option>1 Cuota</option>
                        <option>4 Cuotas sin intereses</option>
                    </select>
                    <button class="submit-button">Pagar</button>
                `;
                break;
            case 'efectivo':
                formHTML = `
                    <input type="text" placeholder="Número de documento de identidad">
                    <button class="submit-button">Continuar pago</button>
                `;
                break;
            case 'paypal':
                formHTML = `
                    <p>Te redireccionaremos a PayPal para completar el pago de forma segura. El precio del plan aparecerá en dólares.</p>
                    
                    <button class="submit-button">Pagar</button>
                 
                `;
                break;
            case 'bitcoin':
                formHTML = `
                    <p>El costo total en dólares y será calculado en BTC</p>
                    <button class="submit-button">Pagar</button>
                `;
                break;
        }
        contentElement.innerHTML = formHTML;
    }

    paymentOptions.forEach(option => {
        const header = option.querySelector('.option-header');
        const content = option.querySelector('.option-content');
        const selectedOption = option.getAttribute('data-option');

        header.addEventListener('click', function() {
            paymentOptions.forEach(opt => {
                opt.querySelector('.option-content').classList.remove('active');
            });
            content.classList.add('active');
            renderPaymentForm(selectedOption, content);
        });
    });

    // Inicialmente, muestra el formulario de tarjeta
    const cardOption = document.querySelector('[data-option="card"]');
    const cardContent = cardOption.querySelector('.option-content');
    cardContent.classList.add('active');
    renderPaymentForm('card', cardContent);
});
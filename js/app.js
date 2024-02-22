/**
 * Custom class to add years to select
 * Car Insurance Page
 * @author Fer Catalano
 */
class UI {

    constructor() {
        this.spinner = document.querySelector('#cargando');
        this.response = document.querySelector('#resultado');
    }

    addYearsToSelect() {
        const max = new Date().getFullYear();
        const min = max - 20;
        for (let i = max; i > min; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            document.querySelector('#year').appendChild(option);
        }
    }

    showSpinner() {
        this.spinner.style.display = 'block';
    }

    showResult(message, className) {
        this.response.classList.add('mt-5');
        this.response.classList.add(className);
        this.response.textContent = message;

        if (className === 'error' || className === 'cotizando') {
            setTimeout(() => {
                this.response.classList.remove('mt-5');
                this.response.classList.remove(className);
                this.spinner.style.display = 'none';
                this.response.textContent = '';
            }, 3000);
        }
    }
}

/**
 * Custom class to car insurance
 * Car Insurance Page
 * @author Fer Catalano
 */
class Car_Insurance {

    /* 
     * Plans
     */
    static base = {
        'basico': 2000,
        'completo': 3000
    };
    /* 
     * 1 : Americano (1.15)
     * 2 : Asiatico (1.05)
     * 3 : Europeo (1.35)
     */
    static percent = {
        1: 1.15,
        2: 1.05,
        3: 1.35
    }

    constructor(brand, year, plan) {
        this.brand = brand;
        this.year = year;
        this.plan = plan;
    }

    calculateInsurance () {
        event.preventDefault();

        const brand = this.brand.value;
        const year = this.year.value;
        const plan = this.plan.value;

        // Validate form
        if (brand === '' || year === '' || plan === '') {
            ui.showResult('Todos los campos son obligatorios', 'error');
            return;
        }

        // Show loading...
        ui.showResult('Cotizando...', 'cotizando');
        ui.showSpinner();
        
        // Calculate the amount
        const response = this.quoteInsurance();

        // Check if result is a string
        if (typeof response !== 'number') {
            ui.showResult('Hubo un error', 'error');
            return;
        }

        // Show result
        setTimeout(() => {
            // 2 decimals
            ui.showResult(`El Costo de tu seguro es de $${response.toFixed(2)}`, 'correcto');
        }, 3000);
    }

    quoteInsurance() {
        // calculate the amount
        let amount = Car_Insurance.base[this.plan.value] * Car_Insurance.percent[this.brand.value];
        // get year and calculate difference
        const diff = new Date().getFullYear() - this.year.value;
        // Each year of the quote has 3% discount
        amount -= ((diff * 3) * amount) / 100;

        return amount;
    }

}


// instance of UI
const ui = new UI();

// Load DOM
document.addEventListener('DOMContentLoaded', () => {
    ui.addYearsToSelect();
})

// Event listeners
const button = document.querySelector('#cotizar-seguro');
button.addEventListener('click', () => {

    const brand = document.querySelector('#marca');
    const year = document.querySelector('#year');
    const plan = document.querySelector('input[type="radio"][name=tipo]:checked');
    
    const carInsurance = new Car_Insurance(brand, year, plan);
    carInsurance.calculateInsurance();
});


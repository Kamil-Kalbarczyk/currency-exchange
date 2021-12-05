let dataBase;

const currencyList = document.querySelector('.currencyList');
currencyList.innerHTML = "";

try {
    let response = await fetch('http://api.nbp.pl/api/exchangerates/tables/A/');
    let data = await response.json();
    dataBase = data;
} catch (error) {
    currencyList.textContent = 'Błąd importu danych'

};

const currencyRates = dataBase[0].rates;

// render currences

const renderCurrences = (currences) => {
    currences.forEach((currency) => {
        const li = document.createElement('li');
        const divCurrencySymbol = document.createElement('div');
        divCurrencySymbol.classList.add('divCurrencySymbol');
        const divCurrencyRate = document.createElement('div');
        divCurrencyRate.classList.add('divCurrencyRate');
        const divCurrencyName = document.createElement('div');
        divCurrencyName.classList.add('divCurrencyName');

        divCurrencySymbol.textContent = currency.code;
        divCurrencyRate.textContent = currency.mid;
        divCurrencyName.textContent = currency.currency;
        li.append(divCurrencySymbol, divCurrencyRate, divCurrencyName);
        currencyList.append(li);
    });
};

renderCurrences(currencyRates);

// search currency

const currencySearchInput = document.querySelector('.currencyListContainer input');

currencySearchInput.addEventListener('keyup', () => {

    currencyList.innerHTML = "";
    const searchCurrency = currencyRates.filter((currency) => {
        if (currency.code.toLowerCase().includes(currencySearchInput.value.toLowerCase()) || currency.currency.toLowerCase().includes(currencySearchInput.value.toLowerCase()))
            return currency
    });

    renderCurrences(searchCurrency);
});

// render day of quotation

const currencyRatesDate = dataBase[0].effectiveDate;
const currencyQuotationDaySpan = document.querySelector('.QuotationDay span');
currencyQuotationDaySpan.textContent = currencyRatesDate;


// compare currency

const compareCurrencyNameFirst = document.querySelector('.chosenCurrencyFirst p');
const compareCurrencySymbolFirst = document.querySelector('.chosenCurrencyFirst label');
const compareCurrencyValueFirst = document.querySelector('.chosenCurrencyFirst input');
let compareCurrencyCourseFirst;

const compareCurrencyValueSecond = document.querySelector('.chosenCurrencySecond input');


const compareCurrency = function () {
    compareCurrencyNameFirst.textContent = this.querySelector('.divCurrencyName').textContent;
    compareCurrencySymbolFirst.textContent = this.querySelector('.divCurrencySymbol').textContent;
    compareCurrencyCourseFirst = Number(this.querySelector('.divCurrencyRate').textContent);
    compareCurrencyValueFirst.setAttribute('placeholder', 0);
    compareCurrencyValueSecond.setAttribute('placeholder', 0);
}

document.querySelectorAll('.currencyList li').forEach(function (li) {
    li.addEventListener('click', compareCurrency);
});

compareCurrencyValueFirst.addEventListener('keyup', () => {
    const firstCurrencyValue = compareCurrencyValueFirst.value;
    const firstCurrencyInSecondCurrency = firstCurrencyValue * compareCurrencyCourseFirst;
    compareCurrencyValueSecond.value = firstCurrencyInSecondCurrency.toFixed(2);
});

// start compare view

const usd = currencyRates.filter((usd) => usd.code === 'USD')[0];
console.log(usd)
compareCurrencyValueFirst.setAttribute('placeholder', 100);
compareCurrencyNameFirst.textContent = usd.currency;
compareCurrencySymbolFirst.textContent = usd.code;
compareCurrencyValueSecond.setAttribute('placeholder', compareCurrencyValueFirst.getAttribute('placeholder') * usd.mid);
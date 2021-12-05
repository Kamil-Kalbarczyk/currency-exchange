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
        const divCurrencyRate = document.createElement('div');
        divCurrencySymbol.textContent = currency.code;
        divCurrencyRate.textContent = currency.mid;
        li.append(divCurrencySymbol, divCurrencyRate);
        currencyList.append(li);
    })
};

renderCurrences(currencyRates);

const currencySearchInput = document.querySelector('.currencyListContainer input');

currencySearchInput.addEventListener('keyup', () => {

    currencyList.innerHTML = "";
    const searchCurrency = currencyRates.filter((currency) => {
        return currency.code.toLowerCase().includes(currencySearchInput.value.toLowerCase())
    });

    renderCurrences(searchCurrency);
});

// render day of quotation

const currencyRatesDate = dataBase[0].effectiveDate;
const currencyQuotationDaySpan = document.querySelector('.QuotationDay span');
currencyQuotationDaySpan.textContent = currencyRatesDate;
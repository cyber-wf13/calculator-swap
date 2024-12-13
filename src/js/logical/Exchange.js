export class Exchange {
  constructor() {
    this.currencyInfo = null;
    this.currencyExchange = null;
  }

  async execRequestToAPI() {
    this.currencyExchange = await this.fillCurrencyExchange();
    this.topCurrencyExchange = this.currencyExchange.slice(0, 3);
    this.currencyExchange = this.currencyExchange.slice(3);
    this.currencyInfo = await this.fillCurrencyInfo();
    this.currencyInfo = this.filterCurrencyList();
  }

  async request(url) {
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  }

  async fillCurrencyInfo() {
    const response = await this.request(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    );
    return response.map((currency) => {
      return {
        "name": currency["cc"],
        "code": currency["r030"],
        "txt": currency["txt"],
      };
    });
  }

  async fillCurrencyExchange() {
    return await this.request("http://localhost:3000/monobank.json");
  }

  getExchange(code, sum) {
    let rateCross = 0;
    for (const idx in this.currencyExchange) {
      if (this.currencyExchange[idx]["currencyCodeA"] == code) {
        rateCross = this.currencyExchange[idx]["rateCross"];
        break;
      }
    }
    return rateCross * sum;
  }

  filterCurrencyList() {
    const codeList = this.currencyExchange.map((item) => {
      return item["currencyCodeA"];
    });

    return this.currencyInfo
      .filter((item) => {
        return codeList.some((code) => {
          return code === item.code;
        });
      })
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }
      });
  }

  getTopCurrency() {
    const topCurrencyExchangeFormat = {};
    this.topCurrencyExchange.forEach((item) => {
      if (item["currencyCodeA"] == 840 && item["currencyCodeB"] == 980) {
        topCurrencyExchangeFormat["usd-uah"] = Object.assign(
          { "name": "USD to UAH" },
          item,
        );
      } else if (item["currencyCodeA"] == 978 && item["currencyCodeB"] == 980) {
        topCurrencyExchangeFormat["eur-uah"] = Object.assign(
          { "name": "EUR to UAH" },
          item,
        );
      } else {
        topCurrencyExchangeFormat["eur-usd"] = Object.assign(
          { "name": "EUR to USD" },
          item,
        );
      }
    });
    return topCurrencyExchangeFormat;
  }

  getCurrencyInfo() {
    return this.currencyInfo.map((item) => {
      return {
        "value": item.code,
        "text": item.name,
      };
    });
  }
}

export class Exchange {
  constructor() {
    this.currencyInfo = null;
    this.currencyExchange = null;
  }

  async execRequestToAPI() {
    this.currencyExchange = await this.fillCurrencyExchange();
    this.currencyInfo = await this.fillCurrencyInfo();
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
        // console.log(this.currencyExchange[idx]);
        rateCross = this.currencyExchange[idx]["rateCross"];
        break;
      }
    }
    return rateCross * sum;
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

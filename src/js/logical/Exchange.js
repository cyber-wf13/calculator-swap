export class Exchange {
  constructor() {
    this.fillCurrencyInfo().then((info) => {
      this.currencyInfo = info;
      // console.log(this.currencyInfo);
    });
  }

  async request(url) {
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  }

  async fillCurrencyInfo() {
    return this.request(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    ).then((res) => {
      return res.map((currency) => {
        return {
          "name": currency["cc"],
          "code": currency["r030"],
          "txt": currency["txt"],
        };
      });
    });
  }

  async fillCurrencyExchange(code) {
    return this.request("http://localhost:3000/monobank.json").then(
      (currency) => {
        for (const idx in currency) {
          if (currency[idx]["currencyCodeA"] == code) {
            return currency[idx];
          }
        }
      },
    );
  }
}

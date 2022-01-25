interface IShippingProvider {
  request(zipCode: string, weight: number): string;
}

class ShippingProvider implements IShippingProvider {
  request(zipCode: string, weight: number): string {
    // ...
    return "45.43$";
  }
}

class AdvanceShippingProvider {
  login(credentials: any) {
    //...
  }

  setZipCode(zipCode: string) {
    // ...
  }

  calculate(weight: number) {
    return "39.50$";
  }
}

class AdvanceShippingProviderAdapter implements IShippingProvider {
  private provider: AdvanceShippingProvider;

  constructor(credentials: any) {
    this.provider = new AdvanceShippingProvider();
    this.provider.login(credentials);
  }
  request(zipCode: string, weight: number): string {
    this.provider.setZipCode(zipCode);
    const cost = this.provider.calculate(weight);
    return cost;
  }
}

(() => {
  const WEIGHT = 10;
  const ZIP_CODE = "123014";

  const shipping = new ShippingProvider();
  const cost = shipping.request(ZIP_CODE, WEIGHT);
  console.log("Cost: " + cost);

  const credentials = { token: "test_tk" };
  const advanceShipping = new AdvanceShippingProviderAdapter(credentials);
  const advanceCost = advanceShipping.request(ZIP_CODE, WEIGHT);

  console.log("Advance Cost: " + advanceCost);
})();

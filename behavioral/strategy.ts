interface Package {
  from: string;
  to: string;
  weight: number;
}

interface ShippingStrategy {
  calculate(pack: Package): number;
}

class Shipping {
  private strategy: ShippingStrategy;

  setStrategy(strategy: ShippingStrategy): void {
    console.log(`Change shipping to ${(<any>strategy).constructor.name}`);
    this.strategy = strategy;
  }

  calculate(pack: Package): number {
    return this.strategy.calculate(pack);
  }
}

class UPSProvider implements ShippingStrategy {
  calculate(pack: Package): number {
    return 40;
  }
}

class USPProvider implements ShippingStrategy {
  calculate(pack: Package): number {
    return 35;
  }
}

class FedexProvider implements ShippingStrategy {
  calculate(pack: Package): number {
    return 39;
  }
}

(() => {
  const pack: Package = { from: "12", to: "43", weight: 12 };
  const shipping = new Shipping();

  shipping.setStrategy(new UPSProvider());
  console.log("Shipping price", shipping.calculate(pack));
  shipping.setStrategy(new USPProvider());
  console.log("Shipping price", shipping.calculate(pack));
  shipping.setStrategy(new FedexProvider());
  console.log("Shipping price", shipping.calculate(pack));
})();

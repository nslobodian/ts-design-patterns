abstract class AbstractProduct {
  protected price: number;

  abstract fill(): void;
  abstract print(): void;
}

interface AbstractProductBuilder {
  prepareProduct(): void;
  fillUpProduct(): void;
  get(): AbstractProduct;
}

class BathroomProduct extends AbstractProduct {
  fill(): void {
    this.price = 0;
  }

  print(): void {
    console.log(`I'm bathroom product with ${this.price}$ price`);
  }
}

class BathroomProductBuilder implements AbstractProductBuilder {
  private product: BathroomProduct;

  prepareProduct(): void {
    this.product = new BathroomProduct();
  }

  fillUpProduct(): void {
    this.product.fill();
  }

  get(): AbstractProduct {
    return this.product;
  }
}

class WarehouseFiller {
  construct(builder: AbstractProductBuilder) {
    builder.prepareProduct();
    builder.fillUpProduct();
    return builder.get();
  }
}
(() => {
  const warehouseFiller = new WarehouseFiller();
  const bathroomProductBuilder = new BathroomProductBuilder();

  const products = [warehouseFiller.construct(bathroomProductBuilder)];

  products.forEach((product) => product.print());
})();

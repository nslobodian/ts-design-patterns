interface AbstractORM {
  getOne(id: string): any;
  read(params?: any): any[];
  save(value: any): any;
}

interface DBDriver {
  create(value: any): any;
  read(params?: any): any[];
}

class MyORM implements AbstractORM {
  constructor(private driver: DBDriver) {}

  getOne(id: string) {
    return this.driver.read({ id });
  }

  read(params?: any): any[] {
    return this.driver.read(params);
  }

  save(value: any) {
    return this.driver.create(value);
  }
}

class BananaDBDriver implements DBDriver {
  create(value: any) {
    // ...
    return "Create in BananaDB";
  }

  read(params?: any): any[] {
    // ...
    return ["Create from BananaDB"];
  }
}

class PineappleDBDriver implements DBDriver {
  create(value: any) {
    // ...
    return "Create in PineappleDB";
  }

  read(params?: any): any[] {
    // ...
    return ["Create from PineappleDB"];
  }
}

(() => {
 const bananaORM = new MyORM(new BananaDBDriver())
 const pineappleORM = new MyORM(new PineappleDBDriver())

 const reads = bananaORM.getOne('1')
 console.log(reads)


 const writes = pineappleORM.save('1')
 console.log(writes)
})()
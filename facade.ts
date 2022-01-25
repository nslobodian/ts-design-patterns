class PaymentGateway {
  pay(userId: string, amount: number): string {
    // ...
    console.log('doing payment...')
    return "success";
  }
}

class Verifier {
  verify(userId: string) {
    // ...
    console.log('verifying...')
  }
}

class PurchaseFacade {
  private paymentGateway = new PaymentGateway();
  private verifier = new Verifier();

  makePurchase(userId: string, amount: number): string {
    this.verifier.verify(userId);
    const paymentResponse = this.paymentGateway.pay(userId, amount);
    return paymentResponse;
  }
}
(() => {
    const purchaseFacade = new PurchaseFacade()
    const response = purchaseFacade.makePurchase('1', 10)
    console.log('Purchase response: ' + response)
})();

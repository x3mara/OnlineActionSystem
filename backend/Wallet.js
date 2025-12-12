class Wallet{
    balance;
    points;
    currency; //string
    constructor(balance, points, currency){
        this.balance = balance;
        this.points = points;
        this.currency = currency;
    }

    withdraw(amount){}
    deposit(amount){}

}
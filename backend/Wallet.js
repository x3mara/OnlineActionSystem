class Wallet{

    #balance;
    #points;
    #currency; //string

    constructor(balance, points, currency){
        this.#balance = balance;
        this.#points = points;
        this.#currency = currency;
    }

    //setters and getters
    getBalance() {return this.#balance;}
    setBalance(balance) {this.#balance = balance;}
    getPoints() {return this.#points;}
    setPoints(points) {this.#points = points;}
    getCurrency() {return this.#currency;}
    setCurrency(currency) {this.#currency = currency;}
    
    withdraw(amount){}
    deposit(amount){}

}
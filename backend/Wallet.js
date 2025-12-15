export default class Wallet{

    #balance;
    #points;
    #currency; //string

    constructor(balance, points){
        this.#balance = balance;
        this.#points = points;
    }

    constructor(){
        this.#balance = 0;
        this.#points = 0;
    }

    //setters and getters
    getBalance() {return this.#balance;}
    setBalance(balance) {this.#balance = balance;}
    getPoints() {return this.#points;}
    setPoints(points) {this.#points = points;}
    getCurrency() {return this.#currency;}
    setCurrency(currency) {this.#currency = currency;}
    
    withdraw(amount){
        if(amount*1.3 > this.#balance){
            return -1; //insufficient funds
        }
        this.#balance -= amount*1.3; //30% PROFITTTT WE RIIICHHHHH
        return this.#balance;

    }
    deposit(amount){
        this.#balance += amount;
    }

}
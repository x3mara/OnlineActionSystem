export default class Wallet{

    #balance;
    #points;

    constructor(balance, points){
        this.#balance = balance;
        this.#points = points;
    }

    constructor(){
        this.#balance = 0;
        this.#points = 0;
    }

    
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
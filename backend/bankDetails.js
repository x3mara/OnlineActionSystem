import {insertBankDetails, depositfromBank, withdrawtoBank} from "../Database/database.js";
export default class BankDetails{

    namekek ;
    wallet_id ;
    CVV ;
    expirydate;
    card_number;
    amount;

    constructor(namekek, wallet_id, CVV, expirydate, card_number){
        this.namekek = namekek;
        this.wallet_id = wallet_id;
        this.CVV = CVV;
        this.expirydate = expirydate;
        this.card_number = card_number;
        this.amount = 0;
    }

    toSQL(){
        return{
        namekek: this.namekek,
        wallet_id: this.wallet_id,
        CVV: this.CVV,
        expirydate: this.expirydate,
        card_number: this.card_number,
        amount: this.amount};
    }

    static async insertBankDetails(sessionBankDetails){
        await insertBankDetails(sessionBankDetails.toSQL()); 
    }

    async depositfromBank(walletID, amount){
        await depositfromBank(walletID, amount);
    }

    async withdrawtoBank(walletID, amount){
        await withdrawtoBank(walletID, amount);
    }


}
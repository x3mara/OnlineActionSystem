import Wallet from "../Wallet.js";
export default class walletController{

    constructor(){

    }

    async withdraw(req, res){
        const { amount } = req.body;
        if(amount*1.3 > req.session.wallet.getBalance()){
            //handle responses
            return -1; //insufficient funds
        }
        else{
            req.session.wallet.setBalance(req.session.wallet.getBalance() - amount*1.3); //30% PROFITTTT WE RIIICHHHHH
            await Wallet.updateWallet(req.session.wallet);
            //handle responses
            return req.session.wallet.getBalance();
        }
        
    }
    async deposit(req, res){
        const { amount } = req.body;
        req.session.wallet.setBalance(req.session.wallet.getBalance() + amount);
        await Wallet.updateWallet(req.session.wallet);
    }

}



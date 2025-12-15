import User from '../User.js';
import Client from '../Client.js';
export default class clientController{


    async register(req, res){
        const { inputUsername, inputPassword, inputEmail } = req.body;
        if (inputPassword.length<8){
            //handle responses
            return "Password must be at least 8 characters long";
        }
        if (inputPassword.length>50){
            //handle responses
            return "Password must be less than 50 characters long";
        }
        if (inputEmail.length<5 || !inputEmail.includes('@')){
            //handle responses
            return "Invalid email address";
        }
        sessionWallet = new Wallet();
        this.sessionClient = await Client.insertClient(inputUsername, inputPassword, inputEmail,walletID);
        if (this.sessionClient == null){
            //handle responses
            sessionWallet=null;
            return "Username already exists";
        }

        Wallet.insertWallet(sessionWallet);
        req.session.wallet = sessionWallet;
        req.session.user = this.sessionClient;
        res.redirect('/dashboard');
        
    }

    async login(req, res){
        const { inputUsername, inputPassword } = req.body;
        this.sessionClient = await User.verifyLogin(inputUsername, inputPassword);
        if (this.sessionClient === false) {
            //handle responses
            return { success: false, field: "password", message: "Incorrect password" };
        } 
        else if (this.sessionClient === null) {
            //handle responses
            return { success: false, field: "username", message: "Username does not exist" };
        } 
        else {
            req.session.user = this.sessionClient;
            req.session.wallet = await Wallet.fetchWallet(this.sessionClient.getWalletID());
            res.redirect('/dashboard');
        }
    }
}
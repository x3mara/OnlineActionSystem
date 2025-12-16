import User from '../User.js';
import Client from '../Client.js';
import Wallet from '../Wallet.js';
export default class clientController{
    

    async register(req, res){

        const { username,email, password} = req.body;
        if (password.length<8){
            //handle responses
            return "Password must be at least 8 characters long";
        }
        if (password.length>50){
            //handle responses
            return "Password must be less than 50 characters long";
        }
        if (email.length<5 || !email.includes('@')){
            //handle responses
            return "Invalid email address";
        }
        const sessionWallet = new Wallet();
        this.sessionClient = await Client.insertClient(username, password, email, sessionWallet.getWalletID());
        
        if (this.sessionClient == null){
            //handle responses
            sessionWallet=null;
            return "Username already exists";
        }

        Wallet.insertWallet(sessionWallet);
        req.session.wallet = sessionWallet;
        req.session.user = this.sessionClient;
        res.render('ClientDashboard' , {success: false, field: "password", message: "Incorrect password"});

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
            req.session.wallet = await Wallet.fetchWallet(this.sessionClient.getUsername());
            res.render('ClientDashboard');
        }
    }
}
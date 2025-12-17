import User from '../User.js';
import Client from '../Client.js';
import Wallet from '../Wallet.js';
export default class clientController{
    

    async register(req, res){
        const { username,email, password} = req.body;
        if (password.length<8){
            //handle responses
            res.render('SignUp' , {success: false, field: "password", message: "Password must be at least 8 characters long"});
        }
        if (password.length>50){
            //handle responses
            res.render('SignUp' , {success: false, field: "password", message: "Password must be less than 50 characters long"});
        }
        if (email.length<5 || !email.includes('@')){
            //handle responses
            res.render('SignUp' , {success: false, field: "email", message: "Invalid email address"});
        }
        const sessionWallet = new Wallet();
        let sessionClient = await Client.insertClient(username, password, email, sessionWallet.getWalletID());
        
        if (sessionClient == null){
            //handle responses
            sessionWallet=null;
            res.render('SignUp' , {success: false, field: "username", message: "Username already exists"});
        }

        Wallet.insertWallet(sessionWallet);
        req.session.wallet = sessionWallet;
        req.session.user = sessionClient;
        res.render('ClientDashboard' , {success: true, field: "", message: "Successfully registered"});
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
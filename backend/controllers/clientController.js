import User from '../User.js';
import Client from '../Client.js';
import Wallet from '../Wallet.js';
import session from 'express-session';
export default class clientController{
    

    async register(req, res){
        const { username,email, password} = req.body;
        if (password.length<8){
            res.render('SignUp' , {success: false, field: "password", message: "Password must be at least 8 characters long"});
        }
        if (password.length>50){
            res.render('SignUp' , {success: false, field: "password", message: "Password must be less than 50 characters long"});
        }
        if (email.length<5 || !email.includes('@')){
            res.render('SignUp' , {success: false, field: "email", message: "Invalid email address"});
        }
        let sessionWallet = new Wallet();
        let sessionClient = await Client.insertClient(username, password, email, sessionWallet.getWalletID());
        sessionWallet.setUserID(sessionClient.getUserID());
        
        if (sessionClient == null){
            sessionWallet=null;
            res.render('SignUp' , {success: false, field: "username", message: "Username already exists"});
        }
        const FEsessionWallet={
            wallet_id:sessionWallet.getWalletID(),
            balance:sessionWallet.getBalance(),
            user_id:sessionClient.getUserID()

        }
        const FEsessionClient={
            user_id:sessionClient.getUserID(),
            username:sessionClient.getUsername(),
            email:sessionClient.getEmail(),
            password:sessionClient.getPassword(),
            wallet_id:sessionWallet.getWalletID(),
            suscounter:sessionClient.getSuspicious(),
            suspended:sessionClient.getSuspended(),
            current_cosmetic:sessionClient.getCurrentCosmetic(),
            points:sessionClient.getpoints(),
            levels:sessionClient.getLevel()
        }
        const sqlObjectWallet= {
            wallet_id:sessionWallet.getWalletID(),
            balance:sessionWallet.getBalance(),
            user_id:sessionClient.getUserID()
        }

        await Wallet.insertWallet(sqlObjectWallet);
        req.session.wallet = FEsessionWallet;
        req.session.user = FEsessionClient;
        res.render('ClientDashboard' , {success: true, field: "", message: "Successfully registered"});
    }

    async login(req, res){
        const { username, password } = req.body;
        const sessionClient = await User.verifyLogin(username, password);
        if (sessionClient === false) {
            res.render('Login' , { success: false, field: "password", message: "Incorrect password" });
        } 
        else if (sessionClient === null) {
            res.render('Login' , { success: false, field: "username", message: "Username does not exist" });
        } 
        else {
            req.session.user = sessionClient;
            req.session.wallet = await Wallet.fetchWallet(sessionClient.getUsername());
            res.render('ClientDashboard', { success: true, field: "", message: "Successfully logged in" });
        }
    }

    async showCredentials(req, res){
        let client = await User.searchClient(req.session.user.getUsername());
        let userIDdisplay = client[0].userID;
        let usernamedisplay = client[0].username;
        let emaildisplay = client[0].email;
        let points = client[0].points;
        let level = client[0].level;
        res.render("nameOfScreen",{userIDdisplay, usernamedisplay, emaildisplay, points, level});
    }
}
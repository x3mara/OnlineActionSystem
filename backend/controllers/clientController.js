import User from '../User.js';
import Client from '../Client.js';
import Wallet from '../Wallet.js';
import Item from '../Item.js';
import session from 'express-session';
import { authPlugins } from 'mysql2';
import { getAllAuctions } from './qol.js';
import Auction from '../Auction.js';
import bankDetails from '../bankDetails.js';
import { withdrawtoBank } from '../../Database/database.js';
export default class clientController{


    async register(req, res){
        const {username,email, password} = req.body;
        if (password.length<8){
            return res.render('SignUp' , {success: false, field: "password", message: "Password must be at least 8 characters long"});
        }
        if (password.length>50){
            return res.render('SignUp' , {success: false, field: "password", message: "Password must be less than 50 characters long"});
        }
        if (email.length<5 || !email.includes('@')){
            return res.render('SignUp' , {success: false, field: "email", message: "Invalid email address"});
        }
        let sessionClient = await Client.insertClient(username, password, email);
        let sessionWallet = new Wallet(sessionClient.getUserID());

        if (sessionClient == null){
            sessionWallet=null;
            return res.render('SignUp' , {success: false, field: "username", message: "Username already exists"});
        }
        const sqlObjectWallet= sessionWallet.toSQL();
        Wallet.insertWallet(sqlObjectWallet);

        req.session.wallet = sessionWallet.getWalletID();
        req.session.user = sessionClient.getUsername();
        return res.redirect('/clientdashboard');
    }

    async login(req, res){
        const { username, password } = req.body;
        req.session.user = await User.verifyLogin(username, password);
        if (req.session.user == false) {
            return res.render('Login' , { success: false, field: "password", message: "Incorrect password" });
        } 
        else {
            req.session.wallet = (await Wallet.fetchWallet(req.session.user))?.wallet_id;
        }
        
        return res.redirect('/clientdashboard');
    }

    async showCredentials(req, res){
        let client = await User.searchClient(req.session.user.getUsername());
        let userIDdisplay = client[0].userID;
        let usernamedisplay = client[0].username;
        let emaildisplay = client[0].email;
        let points = client[0].points;
        let level = client[0].level;
        return res.render("nameOfScreen",{userIDdisplay, usernamedisplay, emaildisplay, points, level});
    }

    async updateAvatar(username, avatar){
        const client = await Client.searchClient(username);
        await client.updateAvatar(avatar);
    }
    async getAvatar(username){
        const client = await Client.searchClient(username);
        return await client.getAvatar();
    }

    async viewAllAuctions(req, res){
        return auctions = await  Client.viewAllAuctions();
    }

    async itemthroughAuction(ItemID){
        return Item.getItemthroughID(ItemID);
    }

    async reportSuspiciousAuction(req, res){
        const { auctionID } = req.body;
        await Auction.incrementSuspicious(auctionID);
    }

    async reportSuspiciousUser(req, res){
        const { userID } = req.body;
        await Client.incrementSuspicious(userID);
    }

    async showWallet(req, res){
        let wallet = await Wallet.fetchWallet(req.session.user);
        return res.render("nameOfScreen",{wallet});
    }

    async suspendUsers(req, res){
        await Client.suspendedUser(req.session.user.getUserID());
    }

    async insertBankDetails(req, res){
        const { name, cvv, exp, number } = req.body;
        let bank_Details = new bankDetails(name, req.session.wallet,  cvv, exp, number);
        bankDetails.insertBankDetails(bank_Details);
    }

    async updateBankDetails(req, res){
        const { name, cvv, exp, number } = req.body;
        let bank_Details = new bankDetails(name, req.session.wallet,  cvv, exp, number);
        bankDetails.updateBankDetails(bank_Details);
    }

    async depositFromBank(req, res){
        const { amount } = req.body;
        bankDetails.depositfromBank(req.session.wallet, amount);
    }

    async withdrawtoBank(req, res){
        const { amount } = req.body;
        await withdrawtoBank(req.session.wallet, amount);
    }

}
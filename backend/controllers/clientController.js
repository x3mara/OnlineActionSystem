import User from '../User.js';
import Client from '../Client.js';
import Wallet from '../Wallet.js';
import Item from '../Item.js';
import session from 'express-session';
import { authPlugins } from 'mysql2';
export default class clientController{
    

    async register(req, res){
        const { username,email, password} = req.body;
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
        let sessionWallet = new Wallet();

        if (sessionClient == null){
            sessionWallet=null;
            return res.render('SignUp' , {success: false, field: "username", message: "Username already exists"});
        }
        const sqlObjectWallet= sessionWallet.toSQL();
        Wallet.insertWallet(sqlObjectWallet);

        req.session.wallet = sessionWallet;
        req.session.user = sessionClient;


        let auctions = await Client.viewAllAuctions();

        const itemPromises = auctions.map(auction => 
            Item.getItemthroughID(auction.item_id) 
        );
        
        const AuItems = await Promise.all(itemPromises);
        
        // Fetch images for each item
        const imagePromises = AuItems.map(item => 
            Item.getItemImgId(item ? item.id : null)
        );
        const ItemImages = await Promise.all(imagePromises);
        
        // Combine data with proper structure
        const combinedData = auctions.map((auction, index) => {
            const item = AuItems[index] || {};
            const images = ItemImages[index] || [];
            
            return {
                auction: auction,      
                item: item,
                ItemImage: images.length > 0 ?
                images.map(img => img.itemimg):
                '/OnlineActionSystem/Public/images/SignUpHero.png' // Get first image
            };
        });
        
        return res.render('ClientDashboard', {
            username: username, 
            recommendedAuctions: combinedData,
            wishlistedAuctions: [] // Empty for now
        });
        
    } 


    async login(req, res){
        const { username, password } = req.body;
        const sessionClient = await User.verifyLogin(username, password);
        if (sessionClient === false) {
            return res.render('Login' , { success: false, field: "password", message: "Incorrect password" });
        } 
        else if (sessionClient === null) {
            return res.render('Login' , { success: false, field: "username", message: "Username does not exist" });
        } 
        else {
            req.session.user = sessionClient;
            req.session.wallet = await Wallet.fetchWallet(sessionClient.getUsername());
             let auctions = await Client.viewAllAuctions();
            
            const itemPromises = auctions.map(auction => 
                Item.getItemthroughID(auction.item_id)
            );
            const AuItems = await Promise.all(itemPromises);
            
            const imagePromises = AuItems.map(item => 
                Item.getItemImgId(item ? item.id : null)
            );
            const ItemImages = await Promise.all(imagePromises);
            
            const recommendedAuctions = auctions.map((auction, index) => {
                const item = AuItems[index] || {};
                const images = ItemImages[index] || [];
                
                return {
                    auction: auction,
                    item: item,
                    ItemImage: images.length > 0 ? images[0].itemimg : '/OnlineActionSystem/Public/images/SignUpHero.png'
                };
            });
            
            return res.render('ClientDashboard', { 
                username: username, 
                recommendedAuctions: recommendedAuctions, 
                wishlistedAuctions: [] 
            });
        }        
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

    async viewAllAuctions(req, res){
        return auctions = await  Client.viewAllAuctions();
    }

    async itemthroughAuction(ItemID){
        return Item.getItemthroughID(ItemID);
    }

}
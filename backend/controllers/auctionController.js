import Item from "../Item.js";
import User from "../User.js";
import Auction from "../Auction.js";
export default class auctionController{

    async startAuction(req, res){
        const {name, desc, buyout_price, starting_price, end_date, tag} 
            = req.body;
        // prepare item
        const item = new Item(name, desc, tag, buyout_price, starting_price);
        await Item.insertItem(item);
        console.log("Session User: " + req.session.user);
        const seller = await User.searchClient("helppleaseplease");
        console.log(seller);
        if(req.session.user instanceof User)
            seller = await User.searchClient(req.session.user.getUsername());
        req.session.user = seller;
        console.log("Used User?: " + seller.getUsername());
        req.session.save();
        const auction = new Auction(item,end_date,seller,starting_price);
        await Auction.insertAuction(auction);
        console.log("Item Details: " + JSON.stringify(item,null,2));
        console.log("Auction Details: " + JSON.stringify(auction,null,2));
        res.render('ClientDashboard', {
            username: req.session.user.getUsername()
        });
    }

    
}
import Item from "../Item.js";
import User from "../User.js";
import Auction from "../Auction.js";
export default class auctionController{

    async startAuction(req, res){
        const {name, desc, buyout_price, starting_price, end_date, tag} 
            = req.body;
        const item = new Item(name, desc, tag, buyout_price, starting_price);
        await Item.insertItem(item);
        console.log("Session User: " + req.session.user);
        let seller = await User.searchClient(req.session.user.getUsername());
        const auction = new Auction(item,end_date,seller,starting_price);
        await Auction.insertAuction(auction);
        console.log("Item Details: " + item);
        console.log("Auction Details: " + auction);
        
    }

    
}
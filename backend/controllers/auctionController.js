import Item from "../Item.js";
import Client from "../Client.js";
import Auction from "../Auction.js";
import { getAllAuctions } from "./qol.js";
export default class auctionController{

    async startAuction(req, res){
        const {name, desc, buyout_price, starting_price, end_date, tag} 
            = req.body;
        const item = new Item(name, desc, tag, buyout_price, starting_price);
        await Item.insertItem(item);

        // console.log(req.session.user);
        if (req.session.user == undefined){
            // this is just to facilitate testing
            req.session.user = 'default_seller';
        }

        const seller = await Client.searchClient(req.session.user);
        const seller_id = seller.getUserID();
        console.log(seller);

        const auction = new Auction(item.itemID,end_date,seller_id,starting_price);
        await Auction.insertAuction(auction);

        console.log("Seller: " + seller.getUsername());
        console.log(seller.getUserID());
        // console.log("Item Details: " + JSON.stringify(item,null,2));
        // console.log("Auction Details: " + JSON.stringify(auction,null,2));

        res.render('ClientDashboard', {
            username: seller.getUsername(),
            recommendedAuctions: await getAllAuctions(),
            wishlistedAuctions: []
        });
    }
}
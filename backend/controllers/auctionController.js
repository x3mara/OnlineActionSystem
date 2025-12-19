import Item from "../Item.js";
import Client from "../Client.js";
import Auction from "../Auction.js";
import { getAllAuctions, combineAuctions } from "./qol.js";
import { getMyAuctions } from "../../Database/database.js";
export default class auctionController{

    async startAuction(req, res){
        const {name, description, buyout_price, starting_price, end_date, tag} 
            = req.body;
        console.log("Description " + description);
        const item = new Item(name, description, tag, buyout_price, starting_price);
        await Item.insertItem(item);

        req.files.forEach(e => {
            item.insertItemImg(e.path);
        });

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

        const recommendedAuctions = await getAllAuctions();
        console.log(recommendedAuctions);

        res.render('ClientDashboard', {
            username: seller.getUsername(),
            recommendedAuctions: recommendedAuctions,
            wishlistedAuctions: []
        });
    }

    async getClientAuctions(username){
        const client = await Client.searchClient(username);
        const auctions = await client.getMyAuctions();
        const combinedData = await combineAuctions(auctions);
        return combinedData;
    }

    async viewAuctionDetails(req, res){
        const auctionID = req.body;
        const auction = Auction.getAuctiondetails(auctionID);
        const sellerName = Auction.getSellerName(auctionID);
        const bidders = Auction.getAllbidders(auctionID);  
    }
}
import Item from "../Item.js";
import Client from "../Client.js";
import Auction from "../Auction.js";
import { getAllAuctions, combineAuctions } from "./qol.js";
import { getMyAuctions , getbidfromusernameandauction } from "../../Database/database.js";
export default class auctionController{

    async bid(req, res){

        const {AuctionID, BidAmount, sessionUsername, sessionWalletID} = req.body;

        const newbid = await makeBid(AuctionID, BidAmount, sessionUsername, sessionWalletID);

        return res.render('DetailedAuctionPage', { newbid });

    }

    async buyout(req, res){

        const {AuctionID, sessionUsername, sessionWalletID} = req.body;
        
        const result = await Buyout(sessionUsername, AuctionID, sessionWalletID);

        return res.render('DetailedAuctionPage', { result });
        
    }



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

    async getRecommendedAuctions(username){
        const auctions = await Client.viewAllAuctions();
        const combinedData = await combineAuctions(auctions.slice(0,8));
        return combinedData;
    }

    async getClientAuctions(username){
        const client = await Client.searchClient(username);
        const auctions = await client.getMyAuctions();
        const combinedData = await combineAuctions(auctions);
        return combinedData;
    }

    async viewAuctionDetails(auctionID, username){

        const auction = await Auction.getAuctiondetails(auctionID);
        const sellerName = await Auction.getSellerName(auctionID);
        const bidders = await Auction.getAllbidders(auctionID);  
        const userBid = await getbidfromusernameandauction(username, auctionID);
        const imgpath = await Item.getItemImgId(auction[0].item_id);

        let max = -1;
        if(userBid.length == 0){
            max = 0;
        } else{
        userBid.forEach(bid => {
            if (bid.bidamount > max) {
                max = bid.bidamount;
            }
        });
        }
        return {
            auction: auction,
            sellerName: sellerName,
            bidders: bidders,
            userBid: max,
            imgpath: imgpath
        };
    }
}
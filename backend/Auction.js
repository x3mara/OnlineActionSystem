import Bid from "./Bid.js";
import Wallet from "./Wallet.js";
import Client from "./Client.js";
import clientController from "./controllers/clientController.js";
import walletController from "./controllers/walletController.js";
import {searchAuction, updateduedate, searchWalletbyWalletID, searchWalletbyid, getsellername,searchItem, insert, viewBidsforAuction, searchClientbyid, updatewalletbalance, updatehighestbid , getEverythingWithItem , getImgs,getAllbidsforAuction, updatesuscounterauction, searchwalletbyUserUsername} from "../Database/database.js";


export default class Auction {
    auctionID;//int
    suspicious;//int
    AuctionedItem;//string (itemID)
    duetime;//datetime
    suspended;//bool
    highestBidder;//string (clientID)
    startingPrice;//float
    sellerID;//string (clientID)
    
    toSQL(){
        return{
        id: this.auctionID,
        sus_counter: this.suspicious, //sus counter
        suspended: false, //OA Reference
        item_id: this.AuctionedItem,
        highest_bidder: this.highestBidder,
        due_date: this.duetime,
        seller_id: this.sellerID};
    }


    constructor(AuctionedItem, duetime, seller, startingPrice) {
        this.auctionID = Date.now();
        this.suspicious = 0;
        this.AuctionedItem = AuctionedItem;
        this.duetime = duetime;
        this.sellerID = seller;
        this.suspended = false;
        this.startingPrice = startingPrice;
        this.highestBidder = null;
        this.highest_bid = startingPrice;
    }

    static async insertAuction(sessionAuction){
        await insert("auction", sessionAuction.toSQL()); 
    }

    static async makeBid(AuctionID, Amount, sessionUsername, sessionWalletID) {
        if(sessionWalletID === undefined){
            sessionWalletID = (await Wallet.searchWallet(sessionUsername)).getWalletID();
        }
        const sessionWallet = await Wallet.searchWalletID(sessionWalletID);
        let sessionUser = await Client.searchClient(sessionUsername);
        let fealks = (await searchAuction(AuctionID))[0];
        let datediff = new Date(fealks.due_date) - new Date(); 
        console.log(fealks.highest_bidder);
        let highestbiddah = (await Client.searchClientID(fealks.highest_bidder)).getUsername();

        if (datediff <= 0) {
            return -2; //auction ended
        }

        if (await searchItem(fealks.item_id).buy_out_price <= Amount) {
            return buyOut(AuctionID, sessionUsername, sessionWalletID);
        }

        const bidrows = await viewBidsforAuction(AuctionID);

        if(bidrows.length){
            if(Amount < bidrows[bidrows.length-1].bidamount/*get the highest bid amount currently*/ || Amount > await searchWalletbyid(sessionUser.userID).balance || Amount < fealks.starting_price) {
                return -1;
            }
            console.log("Highest Biddah: " + highestbiddah);
            const highest_bidder_wallet = await Wallet.searchWallet(highestbiddah);
            Wallet.updateWalletBalance(highest_bidder_wallet, highest_bidder_wallet.getBalance() + bidrows[bidrows.length-1].bidamount);//refund previous highest bidder money with the highest bid amount currently
        }
        const newbid = new Bid(AuctionID, sessionUser.getUserID(), Amount);
        console.log("Amount: " + Amount);
        Wallet.updateWalletBalance(sessionWallet, sessionWallet.getBalance() - Amount);  //update sessionwallet -= Amount in database

        if(datediff < (2 * 60 * 1000)) {
            await updateduedate(AuctionID, new Date(searchAuction(AuctionID).due_date + 2 * 60 * 1000));/*update duetime in database*/
            }
        console.log("IDTOGOTODB: " + sessionUser.getUserID());
        await updatehighestbid(AuctionID, sessionUser.getUserID(), Amount);
        await insert("bid", newbid.toSQL());
        return newbid;

    }

    async suspendAuction(AuctionID) {

            let fealks = await searchAuction(AuctionID);
            let highestbiddah = fealks.highest_bidder;
            const bidrows = await viewBidsforAuction(AuctionID);

            await updatewalletbalance(await searchWalletbyid(highestbiddah), (await searchWalletbyid(highestbiddah).balance + bidrows[bidrows.length-1].bidamount));//refund previous highest bidder money with the highest bid amount currently
            updateAuctionSuspendedStatus(AuctionID, true);
            await updateduedate(AuctionID, new Date()); //set duetime to current time to end auction

    }

    static async buyOut(AuctionID, sessionUsername, sessionWalletID) {
        if(sessionWalletID === undefined){
            sessionWalletID = (await Wallet.searchWallet(sessionUsername)).getWalletID();
        }
        const sessionWallet = await Wallet.searchWalletID(sessionWalletID);
        let sessionUser = await Client.searchClient(sessionUsername);
        let fealks = await searchAuction(AuctionID);
        let datediff = new Date(fealks.due_date) - new Date(); 
        let highestbiddah = fealks.highest_bidder;
        const bidrows = await viewBidsforAuction(AuctionID);
 
        if (datediff <= 0) {
            return -2; //auction ended
        }

        if(await searchwalletbyUserUsername(sessionUsername) < await searchItem(fealks.item_id).buy_out_price) {//get wallet balance and compare it with buyout price
            return -1;
        }

        if(bidrows.length){
            const highest_bidder_wallet = await Wallet.searchWallet(highestbiddah);
            Wallet.updateWalletBalance(highest_bidder_wallet, highest_bidder_wallet.balance + bidrows[bidrows.length-1].bidamount);//refund previous highest bidder money with the highest bid amount currently
        }
        const Amount = await searchItem(fealks.item_id).buy_out_price;
        const newbid = new Bid(AuctionID, sessionUser.getUserID(), Amount);
        console.log(newbid);
        Wallet.updateWalletBalance(sessionWallet, sessionWallet.getBalance() - Amount);  //update sessionwallet -= Amount in database

        await updatehighestbid(AuctionID, sessionUser.getUserID(), Amount); 
        
        await insert('purchase_history', {user_id: sessionUser.getUserID(), item_id: fealks.item_id, final_price: Amount}); //log purchase history

        await updateduedate(AuctionID, new Date());/*update duetime in database*/

        return searchAuction(AuctionID);
        
    }

    async showCurrentBidders(AuctionID) { 
        // return searchClients(searchBids(AuctionID).BidderID); //return list of bidders for the specified auction
    }

    async showCurrentBids(){
        searchBids(AuctionID); //return list of bids for the specified auction
    }

    async incrementSuspicious(id){
        await updatesuscounterauction(id);
    }

    async getAuctionId() {   
        return this.auctionId;
    }
    async isSuspicious() {
        return this.suspicious;
    }
    async getAuctionedItem() {
        return this.AuctionedItem;
    }
    async getDueTime() {
        return this.duetime;
    }
    async getSeller() {
        return this.seller;
    }
    async getBids() {
        return this.bids;
    }
    async getHighestBidder() {
        return this.highestBidder;
    }   

    static async  getAuctiondetails(AuctionID){
        return getEverythingWithItem(AuctionID);
    }

    static async  getSellerName(AuctionID){
        return getsellername(AuctionID);
    }

    static async getAllbidders(AuctionID){
        return getAllbidsforAuction(AuctionID);
    }

}
import 'dotenv/config';
import mysql from "mysql2"; 
import dotenv from "dotenv";
dotenv.config({path: './secrets.env'});

export const pool = mysql.createPool({
  host: 'ballast.proxy.rlwy.net',
  user: 'root',
  password: 'hgXEEhaCMZNikeFJIVEUqnaWUVpbbbwe',
  database: 'auction_system',
  port: 19987,
  multipleStatements: true
}).promise();
export async function insert(tableName,data){
    const sql = 'INSERT INTO ?? SET ?';
    const [rows]=await pool.query(sql,[tableName,data]);
    return rows;
}
export async function viewAllAuctions(){
  const sql = 'select auction.*, users.username as seller_name from auction join users on auction.seller_id = users.id';
  const [rows] =await pool.query(sql);
  return rows;
}

export async function searchUser(username){
  const sql = 'select * from users where username =?';
  const [rows] = await pool.query(sql, [username]);
  return rows;
}
export async function viewReportedAuction(){
  const sql = 'select * from auction where sus_counter>10';
  const [rows] = await pool.query(sql);
  return rows;
}
export async function  viewReportedUsers(){
  const sql = 'select * from clients where suscounter>10';
  const [rows] = await pool.query(sql);
  return rows;
}
export async function searchClientbyusername(username){
  const sql = 'select * from users where  roles ="Client" and username=?';
  const [rows] = await pool.query(sql, [username]);
  return rows;
}
export async function searchClientbyid(id){
  const sql = 'select * from users where  roles ="Client" and id=?';
  const [rows] = await pool.query(sql, [id]);
  return rows;
}
export async function searchAdminbyusername(username){
  const sql = 'select * from users where  roles ="Admin" and username=?';
  const [rows] = await pool.query(sql, [username]);
  return rows;
}

export default async function viewAllClients(){
  const sql ='select * from users where roles ="Client"';
  const [rows] = await pool.query(sql);
  return rows;
}
export async function searchwalletbyUserUsername(username){
  const sql = 'select wallet.* from wallet join users on wallet.user_id = users.id where users.username =?';
  const [rows] = await pool.query(sql, [username]);
  return rows[0];
}
export async function updatewalletbalance(wallet_id,newbalance){
  const sql ='update wallet set balance =? where wallet_id =?';
  const [rows] = await pool.query(sql, [newbalance,wallet_id]);
  return rows;
}
export async function updatehighestbid(auctionID,users_id,amount){
  const sql = 'update auction set highest_bidder =?, highest_bid =? where id =?';
  const [rows] = await pool.query(sql, [users_id,amount,auctionID]);
  return rows;
}
export async function updatesuscounteruser(id){
const sql = 'update clients set suscounter = suscounter +1 where user_id =?';
const [rows] = await pool.query(sql, [id]);
return rows;
}
export async function equipCosmetic(user_id,current_cosmetic){
  const sql = 'update clients set current_cosmetic =? where user_id=?';
  const [rows] = await pool.query(sql, [current_cosmetic,user_id]);
  return rows;
}
export async function removeWishlistItem(user_id, auctionID){
  const sql = 'delete from wishlist where user_id =? and auction_id =?';
  const [rows] = await pool.query(sql, [user_id, auctionID]);
  return rows;
}
export async function updateUserSuspendedStatus(user_id, suspended){
  const sql = 'update clients set suspended =? where user_id=?';
  const [rows] = await pool.query(sql, [suspended,user_id]);
  return rows;
}
export async function  updateAuctionSuspendedStatus(id, suspended){
  const sql = 'update auction set suspended =? where id =?';
  const [rows] = await pool.query(sql, [suspended,id]);
  return rows;
} 
export async function fetchWishlistItems(user_id){
  const sql = 'select auction.* from wishlist join auction on wishlist.auction_id = auction.id where wishlist.user_id =?';
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
} 
export async function viewBidsforAuction(auctionID){
  const sql = 'select bid.*, users.username from bid join users on bid.users_id = users.id where bid.auction_id =?';
  const [rows] = await pool.query(sql, [auctionID]);
  return rows;
}
export async function viewOwnedCosmetics(user_id){
  const sql = 'select cosmetic.* from ownedCosmetics join cosmetic on ownedCosmetics.cosmetic_id = cosmetic.id where ownedCosmetics.user_id =?';
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
}
export async function getImgs(item_id){
  const sql = 'select* from itemimg where item_id =?';
  const [rows] = await pool.query(sql, [item_id]);
  return rows;
}
export async function searchAuction(auctionID){
  const sql = 'select * from auction where id =?';
  const [rows] = await pool.query(sql, [auctionID]);
  return rows;
}
export async function searchItem(item_id){
  const sql = `SELECT item.*' FROM item WHERE item.id =?`;
  const [rows] = await pool.query(sql, [item_id]);
  return rows;
}

export async function getEverythingWithItem(auctionID){
  const sql = 'select auction.* , item.* from auction join item on auction.item_id = item.id where auction.id =?';
  const [rows] = await pool.query(sql, [auctionID]);
  return rows;
}

export async function searchWalletbyid(id){
  const sql = 'select wallet.* from wallet join users on wallet.user_id = users.id where users.id =?';
  const [rows] = await pool.query(sql, [id]);
  return rows;
}
export async function searchWalletbyWalletID(wallet_id){
  const sql = 'select * from wallet where wallet_id =?';
  const [rows] = await pool.query(sql, [wallet_id]);
  return rows;
}

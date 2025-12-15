CREATE DATABASE auction_system;
USE auction_system;
CREATE TABLE users(
id VARCHAR(14) PRIMARY KEY,
email varchar(255) not null,
roles ENUM("Admin","User"),
username varchar(255) not null,
password varchar(255) not null
);
create table item(
id integer primary key,
item_name varchar(200),
item_desc varchar(255),
item_tag ENUM("Game","Furniture","Accessories","Electronics","Vehicles"),
itemimg BLOB,
buy_out_price integer,
starting_price integer
);
create table cosmetic(
id integer primary key,
cosmetic_name varchar(200),
cosmetic_desc varchar(255),
cosmetic_price integer,
cosmeticimg BLOB
);
CREATE TABLE clients(
  user_id varchar(14) PRIMARY KEY ,
  suscounter  integer,
  suspended bool,
  current_cosmetic int,
  points integer,
  levels integer,
  foreign key (user_id) references users(id),
  foreign key(current_cosmetic) references cosmetic(id)
);
CREATE TABLE wallet(
wallet_id int primary key,
user_id varchar(14) unique,
balance integer,
foreign key (user_id)  references users(id)
);
create table auction(
id integer primary key,
sus_counter integer,
suspended bool,
item_id integer,
highest_bidder varchar(14),
due_date timestamp,
seller_id varchar(14),
foreign key (seller_id) references users(id),
foreign key (item_id) references item(id),
foreign key (highest_bidder) references users(id)
);
create table bid(
id integer primary key,
bidamount integer,
bidtime timestamp default now(),
auction_id integer,
users_id varchar(14),
foreign key (auction_id) references auction(id),
foreign key (users_id) references users(id)
);
create table purchase_history(
id integer auto_increment primary key,
user_id varchar(14) ,
item_id int,
final_price integer,
clock timestamp default now(),
foreign key(user_id) references users(id),
foreign key(item_id) references item(id)
);
create table ownedCosmetics(
id integer primary key auto_increment,
cosmetic_id integer,
user_id varchar(14),
foreign key (cosmetic_id) references cosmetic(id),
foreign key(user_id) references users(id)
);
create table solditems(
id integer primary key auto_increment,
item_id integer,
user_id varchar(14),
foreign key (item_id) references item(id),
foreign key (user_id) references users(id)
);
create table wishlist(
id integer primary key auto_increment,
auction_id integer,
user_id varchar(14),
foreign key (auction_id) references auction(id),
foreign key(user_id) references users(id)
);

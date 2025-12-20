import {searchUser,searchClientbyusername,updateImg,viewAllClients} from "../Database/database.js";
export default class User{
    
    #userID;
    #username;
    #password;   
    #email;
    #role;
    #avatar;

    toSQL(){
        return{
        id:this.#userID,
        username:this.#username,
        roles:'Client',
        password:this.#password,
        email:this.#email,
        avatar:this.#avatar};
    }
    // fromSQL(rows){
    //     #id:this.rows[0],
    //     #username:this.rows[1],
    //     #roles:rows[2],
    //     #password:this.rows[3],
    //     #email:this.rows[4];
    // }

    constructor(username, password, email){
        this.#userID = 'u' + Math.trunc((Math.random() + Date.now()));
        this.#username = username;
        this.#password = password;
        this.#email = email;
        this.#avatar = 'static/public/images/DefaultAvatar.png';
    }

    static async searchClient(inputUsername){ // i dont really like this logic
        let rows = await searchClientbyusername(inputUsername);
        return rows; 
    }
    
    //setters and getters
    getUserID(){return this.#userID;}
    getUsername(){return this.#username;}
    getPassword(){return this.#password;}
    setUsername(username){this.#username = username;}
    setPassword(password){this.#password = password;}
    setEmail(email){this.#email = email;}
    getEmail(){return this.#email;}
    setUserID(userID){this.#userID = userID;}
    getAvatar(){return this.#avatar;}
    setAvatar(avatar){this.#avatar = avatar;}


    updateAvatar(path){
        this.#avatar = path;
        updateImg(this.#username,path);
    }

    

    static async searchUserEntity(inputUsername){
        let rows = await searchUser(inputUsername);
        return rows;
    }

    async viewAllClients(){
        const rows = await viewAllClients();
        return rows;
    }
}


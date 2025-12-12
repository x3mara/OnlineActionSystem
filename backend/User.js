class User{
    
    userID;
    username;
    password;   

    constructor(userID, username, password){
        this.userID = userID;
        this.username = username;
        this.password = password;
    }

    getUserID(){return this.userID;}
    getUsername(){return this.username;}
    getPassword(){return this.password;}

    setUsername(username){this.username = username;}
    setPassword(password){this.password = password;}

    login(inputUsername, inputPassword){
        //DATABASE TO VERIFY ????
    }
}
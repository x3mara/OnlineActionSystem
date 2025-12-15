import User from '../User.js';
import Client from '../Client.js';
export default class clientController{
    sessionClient;

    async register(inputUsername, inputPassword, inputEmail){

        if (inputPassword.length<8){
            return "Password must be at least 8 characters long";
        }
        if (inputPassword.length>50){
            return "Password must be less than 50 characters long";
        }
        if (inputEmail.length<5 || !inputEmail.includes('@')){
            return "Invalid email address";
        }
        
        this.sessionClient = await Client.insertClient(inputUsername, inputPassword, inputEmail);
        if (this.sessionClient == null){
            return "Username already exists";
        }
        
    }

    async login(inputUsername, inputPassword){

        this.sessionClient = await client.login(inputUsername, inputPassword);
        if (this.sessionClient==false){
            return "Incorrect password";
        }
        else if (this.sessionClient==null){
            return "Username does not exist";
        }
        else{
            return "Login successful";
        }
    }
}
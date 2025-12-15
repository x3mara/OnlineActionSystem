import User from '../User.js';
import Client from '../Client.js';
export default class clientController{


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
        
        let client = await Client.insertClient(inputUsername, inputPassword, inputEmail);
        if (client == null){
            return "Username already exists";
        }
        
    }

    async login(inputUsername, inputPassword){

        let sessionClient = await client.login(inputUsername, inputPassword);
        if (sessionClient==false){
            return "Incorrect password";
        }
        else if (sessionClient==null){
            return "Username does not exist";
        }
        else{
            return "Login successful";
        }
    }
}
import bcrypt from 'bcrypt'
import * as CryptoJS from 'crypto-js';

export default class Hash{

    private salt = 10;
    private bcrypt = bcrypt;
    private crypto = CryptoJS;

    async hashData(data: string, saltCustom?: Number) {

        try{
            const salt = await this.bcrypt.genSalt(saltCustom ? saltCustom : this.salt)
            const hash = await this.bcrypt.hash(data, salt)

            return hash

        } catch(error){
            console.log(error.message);         
        }
    }

    async hashCompareData(data: string, dataToCompare: string, saltCustom?: Number) {

        try{
            const salt = await this.bcrypt.genSalt(saltCustom ? saltCustom : this.salt)
            const hash = await this.bcrypt.hash(data, salt)

            const compareData = await this.bcrypt.compare(dataToCompare, hash)

            return compareData

        } catch(error){
            console.log(error.message);         
        }
    }

    generateToken(data: string){
        try{
            const secretKey = "ID CLIENT"
            const token = this.crypto.HmacSHA256(data, secretKey).toString();
            
            return token;
        } catch (error){
            console.log(error);    
        }
    }
}
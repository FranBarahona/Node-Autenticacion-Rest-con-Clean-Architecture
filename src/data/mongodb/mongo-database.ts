import mongoose from 'mongoose';
interface Options {
    mongoUrl: string;
    dbName: string;
}
export class MongoDatabase {
    static async connect(options:Options) {
        const { mongoUrl, dbName } = options;
        try{
           await  mongoose.connect(mongoUrl, {
                dbName
            }
            );
            console.log("base de datos conectada");
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}
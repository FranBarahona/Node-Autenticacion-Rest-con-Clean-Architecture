import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{
    main();
})();
async function main(){

await MongoDatabase.connect({
    dbName: process.env.DB_NAME || 'test',
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017'
});
 new Server({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    routes: AppRoutes.routes
 }).start();
}
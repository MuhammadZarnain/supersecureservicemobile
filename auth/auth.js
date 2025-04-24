const pgTools = require('pgtools')
const dotEnv = require('dotenv')
dotEnv.config()
async function initDatabase(){
    try{
        await pgTools.createdb({
            user:"postgres.tfrnrryaupdwvwyrdycu",
            password: "@#Osman123#@",
            port:6543,
            host:"aws-0-ap-south-1.pooler.supabase.com"
        },postgres);
    }catch(err){
        if(String(err).includes('attempted to create a duplicate database')){
            console.log('Database already exists,code 42p04,this can be ignored')
        }else{
            console.log(err)
        }
    }
}

exports.initDatabase = initDatabase;
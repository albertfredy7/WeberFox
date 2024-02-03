const express =require('express');
const {connectToMongoDB} = require('./connect')
const urlRouter  = require('./routes/url')

const app = express();
const port = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log('mogodb connected');
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json())


app.use('/url',urlRouter)





app.listen(port,()=>{
    console.log(`server started listening at port ${port}`);
})
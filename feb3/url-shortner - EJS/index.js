const express =require('express');
const path = require('path');
const {connectToMongoDB} = require('./connect')
const urlRouter  = require('./routes/url')
const staticRouter = require('./routes/staticRouter')

const app = express();
const port = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log('mogodb connected');
})
.catch((err)=>{
    console.log(err);
})

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/url',urlRouter)
app.use('/',staticRouter)





app.listen(port,()=>{
    console.log(`server started listening at port ${port}`);
})
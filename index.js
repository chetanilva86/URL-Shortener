const express = require('express');
const { connectTOMongoDB } = require('./connect');
const URL = require('./models/url');
const path = require('path')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly ,checkAuth} = require('./middlewares/auth')

// routess
const  urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')




const app = express()

const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())


// mongo connections
connectTOMongoDB('mongodb://localhost:27017/short-urlv3').then(()=>{
    console.log('Mongodb is connected to your server');
    
})

app.use('/url',restrictToLoggedinUserOnly ,urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);


app.set('view engine','ejs')
app.set('views',path.resolve('./views'));



app.get('/url/:shortid', async (req , res )=>{
  const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate({
    shortId:shortid,
  },{
    $push:{
      visitHistory: {
        timestamp:Date.now()
      }
    }
  })

  res.redirect(entry.redirectURL);

})

app.listen(PORT,()=>{
    console.log(`Server is START in ${PORT}`);
    
})
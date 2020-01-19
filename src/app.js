const path =require('path')
const express= require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

//Define paths for express config
const pathvar = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(pathvar))

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather',
    name:'Sunitha'
})

})

app.get('/about',(req,res)=>{

    res.render('about',{
title:'About',
name:'Sunitha'

    })
})

app.get('/help',(req,res)=>{
res.render('help',{
    helpText:'I am the new message',
    title:'Help',
name:'Sunitha'
})
})

app.get('/products',(req,res)=>{
if(!req.query.search){
return res.send({
    error:'You must provide search value'
})

}
    console.log(req.query.search)
res.send({
    products:[]
})

})

    app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'Address should be provided'
            })
        }
        const address=req.query.address
        geocode(address,(error,{latitude,longitude,location}={})=>{
            if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address: address
            })

        })
        })

           
       
            })

            app.get('/help/*',(req,res)=>{
res.render('error',{
    title:'404 ERROR',
    errormessage:'Help article not found',
    name:'Sunitha'
})

            })

            app.get('*',(req,res)=>{
res.render('error',{
    title:'404 ERROR',
    errormessage:'Page not found',
    name:'Sunitha' 
})

            })

app.listen(port,()=>{

    console.log('Server is up and running on port '+port)
})
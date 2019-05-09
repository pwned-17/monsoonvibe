const path = require("path") //its core node module
const express = require("express")
const app = express()
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")
const port = process.env.PORT || 8080

//defined paths for express config
const publicDir = path.join(__dirname, "../public")
const viewDir = path.join(__dirname, "../template/views")
const partialsDir = path.join(__dirname, "../template/partials")

//setup handlebar engine and view location
app.set("view engine","hbs")
app.set("views", viewDir)
hbs.registerPartials(partialsDir)

//setup for ststic dir
app.use(express.static(publicDir))

app.get("", (req,res)=>{
    res.render('index',{
        title: "MonsoonVibe",
        name: "This is the new cool weather api"
    })
})

app.get("/about", (req,res)=>{
    res.render("about", {
        title: "About",
        name: "Our about page"
    })
})

app.get("/help", (req,res)=>{
    res.render("help",{
        title:"Help",
        name: "Our help page",
        helpMsg: "This is the sample help message."
    })
})

app.get("/weather", (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "The address wasn't provided"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error: error,
                })
            }
            res.send({
                location,
                forecastData,
            })
        })        
    })
})

app.get("/help/*", (req,res)=>{
    res.render("404", {
        title: "Help page error 404",
        name: "Help article not found"
    })
})

//for routes that don't exsist
app.get("*", (req,res)=>{
    res.render("404", {
        title: "Error 404",
        name: "Page not found"
    })
})

app.listen(port, ()=>{
    console.log("Server started!")
})
const request = require("request")

const geocode = (add, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(add)+".json?access_token=pk.eyJ1Ijoic2FydGhha3ByYW5lc2giLCJhIjoiY2p2YW5iOW55MWVkZzQ0czEybGtyMGJvOSJ9.F22bYKm-FsvnCq3PAOx9SA&limit=1"
    //here we use encodeURIComponent() for making sure special charachters are taken care off

    request({url, json:true}, (error, response)=>{
        if(error){
            callback("Unable to connect", undefined)
        } else if(response.body.features.length === 0){
            callback("Unable to find loaction. Try another search", undefined)
        } else {
            const {features} = response.body
            const longitude = features[0].center[0]
            const latitude = features[0].center[1] 
            const location = features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location,
            })
        }
    })
}

module.exports = geocode
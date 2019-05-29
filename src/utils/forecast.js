const request = require("request")

const forecast = (latitude, longitude, callback)=>{
    const url = "https://api.darksky.net/forecast/58957fdf7044179cfc14e21df8dcdd05/"+latitude+","+longitude+"?units=si&lang=en"
    request({url, json:true}, (error, response)=>{
        const {error: responseError, currently} = response.body
        if(error){
            callback("Unable to connect to the weather service", undefined)
        } else if(responseError){
            callback(responseError,undefined)
        } else{
            const data = {
                summary: response.body.daily.data[0].summary,
                temperature: currently.temperature,
                rain: currently.precipProbability*100 + "%",
                timezone: response.body.timezone,
                icon: currently.icon,
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast
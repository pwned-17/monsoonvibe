console.log("Client side js file")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msgLocation = document.querySelector("#location")

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = search.value
    const url = "/weather?address="+location;
    msgLocation.textContent = "Loading...."
    document.querySelector("#forecast-summary").textContent = "Summary: " + "loading"
    document.querySelector("#forecast-temperature").textContent = "Current Temperature: " + "loading"
    document.querySelector("#forecast-rain").textContent = "Rain probability: " + "loading"
    document.querySelector("#forecast-timezone").textContent = "Timezone: " + "loading"
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgLocation.textContent = data.error
            document.querySelector("#forecast-summary").textContent = ""
            document.querySelector("#forecast-temperature").textContent = ""
            document.querySelector("#forecast-rain").textContent = ""
            document.querySelector("#forecast-timezone").textContent = ""
        } else {
            forecast = data.forecastData
            msgLocation.textContent = "Location: " + data.location
            document.querySelector("#forecast-summary").textContent = "Summary: " + forecast.summary
            document.querySelector("#forecast-temperature").textContent = "Current Temperature: " + forecast.temperature  + " degree Celcius"
            document.querySelector("#forecast-rain").textContent = "Rain probability: " + forecast.rain
            document.querySelector("#forecast-timezone").textContent = "Timezone: " + forecast.timezone
        }
    })
})
})
function checkWeather(){

    let cname = document.getElementById('getLocation').value;

    const apiKey = 'f5acf7aa561eaa6bb7be56349a935ca2';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cname}&appid=${apiKey}`;
    

    fetch(apiUrl)
    .then(response => {
        if(!response.ok){
            throw new Error("Network was not connected");
        }
        return response.json();
    })
    .then(data => {
        let temperature = data.list[0].main.temp;
        let desc = data.list[0].weather[0].description;
        let tempCelcius = temperature-273.15;
        let add = document.getElementById('weather');
        let append = ` <img src="assets/climate_icon.jpeg" alt="image" height="100px" width="100px" style="margin-left: 350px;">
                        <p><strong style="font-size:40px">${tempCelcius.toFixed(2)}</strong>&nbsp;<img src="assets/celcius.svg" alt="img" height="40px" width="40px" style="margin-bottom:15px"></p>
                        <h2 style="margin-top:-20px;text-transform: capitalize;">${desc}</h2>
                        <i class="fa-solid fa-location-dot mb-3">&emsp;${cname}</i>`
        add.innerHTML = append + getForecast(data);
    })
    .catch(error => console.log("There was an error :"+error));
    
}

function getForecast(data){
    let dailyforecast = {};
    data.list.forEach(item => {
        let timeStamp = item.dt * 1000;
        let date = new Date(timeStamp);
        let day = date.toLocaleDateString('en-US',{weekday :'long'});

        if(!dailyforecast[day]){
            dailyforecast[day] = [];
        }

        dailyforecast[day].push({
            temp : item.main.temp,
            desc : item.weather[0].description,
        });
    });
    
    let forecast = "";
    for(let day in dailyforecast){
        let temp = dailyforecast[day][0].temp-273.15;
        forecast+=`<td><h5>${day}</h5><p><img src="assets/climate_icon.jpeg" alt="image" height="40px" width="40px"></p>
        <p style="margin-top:-20px;"><strong style="font-size:20px">${temp.toFixed(2)}</strong>&nbsp;<img src="assets/celcius.svg" alt="img" height="15px" width="15px" style="margin-bottom:10px"></p>
        <h6 style="margin-top:-20px;text-transform: capitalize;">${dailyforecast[day][0].desc}</h6><td>`
    }

    let table = `<table class="table"><tr>${forecast}</tr></table>`

    return table;
}

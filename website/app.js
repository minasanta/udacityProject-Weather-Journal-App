
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Personal API Key for OpenWeatherMap API, URL
const apiKey = ",&appid=c79c656383a6233b5f1ebc7f9780ffc6&units=imperial";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', generateData);

/* Function called by event listener */
function generateData() {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWebAPI(baseURL, zipCode, apiKey)
        .then(data => {
            console.log(data); // see what data I want to post
            postData('/add', { date: newDate, temp: data.main.temp, feelings });
            //Update the UI
            let temp = data.main.temp;
            let tempbyC = ((temp - 32) * (5 / 9)).toFixed(2); //convert to Celsius
            const title = document.querySelector('.title');
            title.innerHTML = `<h2>The country is <span class="important-title">${data.name}</span></h2>`;
            document.getElementById('date').textContent = newDate;
            document.getElementById('temp').textContent = `${tempbyC}℃`;
            document.getElementById('userResponse').textContent = feelings;
        });
}

/* Function to GET Web API Data*/
async function getWebAPI(baseURL, zip, apiKey) {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log("Error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log("Project Data from post is", newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


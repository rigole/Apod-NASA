const API_URL = 'http://localhost:8000';


 async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.

    const response =  await fetch(`${API_URL}/planets`)
     return await response.json()
   /*return fetch(`${API_URL}/planets`,{
     method: "GET",
   })
       .then((response) =>{
         return response.json()
       })
       .catch((error) => console.log(error))*/


}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
    const response = await fetch(`${API_URL}/launches`)
    const fetchedLaunches = await response.json()
    return fetchedLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber
    })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
    await fetch(`${API_URL}/launches`, {
        method: "post",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(launch),
    })
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
const API_URL = 'http://localhost:8000';


 function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.

   return fetch(`${API_URL}/planets`,{
     method: "GET",
   })
       .then((response) =>{
         return response.json()
       })
       .catch((error) => console.log(error))


}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
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
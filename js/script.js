/*
    Assignment #4
    Manish Makwana
*/

$(function () {
    // Check if geolocation is allowed by the user
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Get the current location
      const { latitude: lat, longitude: lon } = position.coords;
      
      // Display the current location on the page
      $("#locationhere").text(`Your current location is: ${lat}, ${lon}`);
      
      // Check if a location value is stored in local storage
      const storedLoc = localStorage.getItem("location");
      if (storedLoc) {
        // Convert the stored location from a string to an array of numbers
        const [storedLat, storedLon] = storedLoc.split(",").map(Number);
        
        // Calculate the distance between the stored location and the current location
        const dist = calcDistanceBetweenPoints(storedLat, storedLon, lat, lon);
        
        // Display the distance to the user
        const distKm = dist / 1000; // Convert meters to kilometers
        $("<p>").text(`You traveled ${distKm.toFixed(2)} km since your last visit.`).insertAfter("#locationhere");
        
        // Display a welcome message to returning visitors
        $("<h2>").text("Welcome back to our website!").insertBefore("#locationhere");
        
        // Display the stored location on the page
        $("<p>").text(`Your last location was: ${storedLat}, ${storedLon}`).insertAfter("#locationhere");
      } else {
        // Display a welcome message to new visitors
        $("<h2>").text("Welcome to our website!").insertBefore("#locationhere");
      }
      
      // Store the current location in local storage
      localStorage.setItem("location", `${lat},${lon}`);
    }, function(error) {
      // Geolocation was blocked or unavailable, display an error message to the user
      $("<p>").text("Error: Geolocation is not enabled or could not get your location.").insertAfter("#locationhere");
    }, { enableHighAccuracy: true });
  } else {
    // Geolocation not supported, display an error message to the user
    $("<p>").text("Error: Geolocation is not supported by your browser.").insertAfter("#locationhere");
  }





    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});



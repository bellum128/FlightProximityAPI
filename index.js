import {fetchFromRadar} from 'flightradar24-client'
import express from 'express';
const app = express();
const port = 6129;


app.get("/getflights", (req, res) => {

    let expand_radius = ((req.query.expand_radius) ? parseFloat(req.query.expand_radius) : 0);

    let querySet = {
        north_lat: parseFloat(req.query.north_lat) + expand_radius,
        west_long: parseFloat(req.query.west_long) - expand_radius,
        south_lat: parseFloat(req.query.south_lat) - expand_radius,
        east_long: parseFloat(req.query.east_long) + expand_radius,
        center_lat: parseFloat(req.query.center_lat),
        center_long: parseFloat(req.query.center_long),
        expand_radius: expand_radius
    };

    console.log("Query Set:");
    console.log(querySet);

    
    let fin = {};
    fetchFromRadar(querySet.north_lat, querySet.west_long, querySet.south_lat, querySet.east_long)
    .then((flights) => {

        flights.forEach(curr => {
            // Calculate approx. distance in miles
            curr.distanceToCenter = (Math.sqrt( Math.pow((curr.latitude - querySet.center_lat),2) + Math.pow((curr.longitude - querySet.center_long),2)) * 69);
        });


        flights.sort((a, b) => (a.distanceToCenter > b.distanceToCenter) ? 1 : -1);
        console.log(flights);

        fin = {
            flights: flights,
            success: true
        }

        res.send(fin);
    })
    .catch((e) => {
        console.log(e);
        fin = {
            success: false
        };

        res.send(fin);
    });
});

app.listen(port, () => {
    console.log(`Flight Display API listening at http://localhost:${port}`);
});
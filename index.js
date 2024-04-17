import { fetchFromRadar } from "flightradar24-client";
import express from "express";
const app = express();
const port = 6129;

app.get("/getflights", (req, res) => {
    const expandRadius = ((req.query.expand_radius) ? parseFloat(req.query.expand_radius) : 0);

    const querySet = {
        north_lat: parseFloat(req.query.north_lat) + expandRadius,
        west_long: parseFloat(req.query.west_long) - expandRadius,
        south_lat: parseFloat(req.query.south_lat) - expandRadius,
        east_long: parseFloat(req.query.east_long) + expandRadius,
        center_lat: parseFloat(req.query.center_lat),
        center_long: parseFloat(req.query.center_long),
        expand_radius: expandRadius
    };

    console.log("Query Set:");
    console.log(querySet);

    let final = {};
    fetchFromRadar(querySet.north_lat, querySet.west_long, querySet.south_lat, querySet.east_long)
        .then((flights) => {
            flights.forEach(curr => {
                // Calculate approx. distance in miles
                curr.distanceToCenter = (Math.sqrt(Math.pow((curr.latitude - querySet.center_lat), 2) + Math.pow((curr.longitude - querySet.center_long), 2)) * 69);
            });

            flights.sort((a, b) => (a.distanceToCenter > b.distanceToCenter) ? 1 : -1);
            console.log(flights);

            final = {
                flights,
                success: true
            };

            res.send(final);
        })
        .catch((e) => {
            console.log(e);

            final = {
                success: false
            };

            res.send(final);
        });
});

app.listen(port, () => {
    console.log(`Flight Display API listening on port ${port}`);
});

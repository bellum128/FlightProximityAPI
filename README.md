# Flight Proximity API
---

### Description
A simple API to gather the nearby planes to a given location.

### Usage

#### GET /getflights

Retrieves a list of flights based on geographical coordinates, and an optional expansion radius that adjusts the search area.


#### Query Parameters

| Parameter    | Type    | Description                                           | Required |
|--------------|---------|-------------------------------------------------------|----------|
| `north_lat`  | float   | Northern latitude of the search boundary              | Yes      |
| `west_long`  | float   | Western longitude of the search boundary              | Yes      |
| `south_lat`  | float   | Southern latitude of the search boundary              | Yes      |
| `east_long`  | float   | Eastern longitude of the search boundary              | Yes      |
| `center_lat` | float   | Latitude of the central point for distance calculation| Yes      |
| `center_long`| float   | Longitude of the central point for distance calculation| Yes     |
| `expand_radius`| float | Optional radius in degrees to expand the search area | No       |

#### Response

The response is a JSON object containing the list of flights sorted by their approximate distance to the center point specified in the query. Each flight in the list includes an additional field for the calculated distance to the center.

##### Success Response Example

```json
{
    "flights": [
        {
            "flight_id": "AB123",
            "latitude": 37.7749,
            "longitude": -122.4194,
            "distanceToCenter": 5.2
        },
        {
            "flight_id": "CD456",
            "latitude": 37.8049,
            "longitude": -122.4294,
            "distanceToCenter": 6.5
        }
    ],
    "success": true
}
```


### Related Projects
[bellum128/TwitchPlaneBot](https:/github.com/bellum128/TwitchPlaneBot)
[bellum128/RTIRLAPIRelay](https:/github.com/bellum128/RTIRLAPIRelay)

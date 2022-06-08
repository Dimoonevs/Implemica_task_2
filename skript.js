// We create an adjacency list which is an object, the keys of the object are the names of cities
// In the values we use the object, that is, the object in the object. 
// Inside, we write the city to which it is adjacent as a key, and the cost of the path in the values 
let graph = {
    gdansk: {bydgoszcz: 1, torun: 3},
    bydgoszcz: {torun: 1, warszawa: 4},
    torun: {warszawa: 1},
    warszawa: {}
}


let S = {}; // With this variable we will mark the paths traveled
let distances = {}; // Shortest paths from the starting city
let previous = {}; // Previous cities

// I will solve this problem using Dijkstra's algorithm
// I create a function in which I will describe this method and pass the graph itself and the starting values

function dijkstra(graph, startCity){

    let cities = Object.keys(graph) // We get the index of each city recorded in the column

    // By default, all distances are unknown (infinite)
    cities.forEach(city => {
        distances[city] = Infinity;
        previous[city] = null;
    });

    // distance to starting city is 0
    distances[startCity] = 0;
    function handleCity(city){
        // Distance to city
        let activeCityDistance = distances[city]

        // Adjacent cities with distance to them
        let neighbours = graph[activeCity];

        // For all adjacent cities, recalculate distances
        Object.keys(neighbours).forEach(neighbourCity => {
            // Calculated distance
            let currentNeighbourDistance = distances[neighbourCity];
            let newNeighbourDistance = activeCityDistance + neighbours[neighbourCity];
            
            if (newNeighbourDistance < currentNeighbourDistance) {
            distances[neighbourCity] = newNeighbourDistance;
            previous[neighbourCity] = city;
            }
        });

        // Mark the city as completed
        S[city] = 1;
    }

    // Looking for the nearest city from the raw
    let activeCity = findNearestCity(distances, S);

    // We continue the loop until there are unprocessed vertices
    while(activeCity) {
        handleCity(activeCity);
        activeCity = findNearestCity(distances, S);
    }

    console.log(distances.warszawa)
}

// Helper function to find the nearest known city

function findNearestCity(distances, S) {
    let minDistance = Infinity;
    let nearestCity = null;
  
    Object.keys(distances).forEach(city => {
      if (!S[city] && distances[city] < minDistance) {
        minDistance = distances[city];
        nearestCity = city;
      }
    });
  
    return nearestCity;
}

dijkstra(graph, 'gdansk');

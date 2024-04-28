// Definition of types and classes
enum ResourceType {
    Mineral,
    Gas,
    Water,
    Organic
}

interface Spaceship {
    health: number;
    cargoCapacity: number;
    speed: number;
}

interface Event {
    name: string;
    effect: string;
}

class Planet {
    constructor(public name: string, public resourceType: ResourceType, public hazards: string[]) {}
}

type Direction = 'north' | 'south' | 'east' | 'west';

let score = 0;
let level = 1;
let resourcesCollected = {
    [ResourceType.Mineral]: 0,
    [ResourceType.Gas]: 0,
    [ResourceType.Water]: 0,
    [ResourceType.Organic]: 0
};

function generateRandomEvent(): Event {
    const eventTypes: string[] = ['Meteoroids', 'Asteroid Storm', 'Radiation Field', 'Wormhole'];
    const effects: string[] = ['Damage to the ship', 'Reduced speed', 'Decreased health', 'Increased speed'];
    
    const randomType: string = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomEffect: string = effects[Math.floor(Math.random() * effects.length)];
    
    return { name: randomType, effect: randomEffect } as Event;
}


function generateRandomPlanet(): Planet {
    const planetNames: string[] = ['Earth', 'Jupiter', 'Mercury', 'Uranus', 'Neptune', 'Pluto', 'Venus', 'Mars'];
    const resourceTypes: ResourceType[] = [ResourceType.Mineral, ResourceType.Gas, ResourceType.Water, ResourceType.Organic];
    const hazards: string[] = ['Sandstorms', 'Extreme temperatures', 'Radiation', 'Electrical storms'];

    const randomName: string = planetNames[Math.floor(Math.random() * planetNames.length)];
    const randomResourceType: ResourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    const randomHazards: string[] = hazards.slice(0, Math.floor(Math.random() * hazards.length) + 1);

    return new Planet(randomName, randomResourceType, randomHazards);
}

function explore(direction: Direction, spaceship: Spaceship): void {
    console.log(`Navigating to ${direction}...`);

    // Generate a random event
    const randomEvent: Event = generateRandomEvent();
    
    // Generate a random planet
    const randomPlanet: Planet = generateRandomPlanet();

    // Base value of collected resources
    let baseCollectedResources = 0;

    // Update ship statistics based on direction
    switch (direction) {
        case 'north':
            spaceship.health -= Math.floor(Math.random() * 10) + 1; // Reduce health between 1 and 10 points
            spaceship.cargoCapacity -= Math.floor(Math.random() * 20) + 1; // Reduce cargo capacity between 1 and 20 points
            spaceship.speed -= Math.floor(Math.random() * 5) + 1; // Reduce speed between 1 and 5 points
            break;
        case 'south':
            spaceship.health -= Math.floor(Math.random() * 15) + 1;
            spaceship.cargoCapacity -= Math.floor(Math.random() * 25) + 1;
            spaceship.speed -= Math.floor(Math.random() * 7) + 1;
            break;
        case 'east':
            spaceship.health -= Math.floor(Math.random() * 8) + 1;
            spaceship.cargoCapacity -= Math.floor(Math.random() * 15) + 1;
            spaceship.speed -= Math.floor(Math.random() * 3) + 1;
            break;
        case 'west':
            spaceship.health -= Math.floor(Math.random() * 12) + 1;
            spaceship.cargoCapacity -= Math.floor(Math.random() * 18) + 1;
            spaceship.speed -= Math.floor(Math.random() * 4) + 1;
            break;
        default:
            console.log('Invalid direction. Please enter a valid direction (north, south, east, west).');
            return;
    }

    // Update collected resources
    const increasedMinerals = Math.floor(Math.random() * 2) + 2; // Increase minerals by 2 or 3 units randomly
    resourcesCollected[ResourceType.Mineral] += increasedMinerals;
    
    // Update score and level randomly
    score += Math.floor(Math.random() * 10) + 1;
    if (score % 50 === 0) {
        level++;
    }

    // Show updated ship status, resources, score, and level
    showShipStatus(spaceship);
    showResources();
    showPlanet(randomPlanet);
    showEvent(randomEvent);

    // Show alert if the ship is damaged
    if (spaceship.health <= 0) {
        console.log('The ship is damaged. The mission has failed.');
    }
}

function showShipStatus(spaceship: Spaceship): void {
    console.log(`Ship Status: Health: ${spaceship.health}, Cargo Capacity: ${spaceship.cargoCapacity}, Speed: ${spaceship.speed}`);
}

function showResources(): void {
    console.log(`Collected Resources: Mineral: ${resourcesCollected[ResourceType.Mineral]}, Gas: ${resourcesCollected[ResourceType.Gas]}, Water: ${resourcesCollected[ResourceType.Water]}, Organic: ${resourcesCollected[ResourceType.Organic]}`);
}

function showPlanet(planet: Planet): void {
    console.log(`Planet: ${planet.name}, Resource: ${ResourceType[planet.resourceType]}, Hazards: ${planet.hazards.join(', ')}`);
}

function showEvent(event: Event): void {
    console.log(`Event: ${event.name} - Effect: ${event.effect}`);
}

// Simulation of a journey
function simulateJourney(direction: Direction): void {
    const spaceship: Spaceship = { health: 100, cargoCapacity: 200, speed: 50 };

    explore(direction, spaceship);
}

// Capture direction argument from the command line
const directionInput = process.argv[2];
if (['north', 'south', 'east', 'west'].includes(directionInput)) {
    const direction: Direction = directionInput as Direction;
    simulateJourney(direction);
} else {
    console.log('Invalid direction. Please enter a valid direction (north, south, east, west).');
}

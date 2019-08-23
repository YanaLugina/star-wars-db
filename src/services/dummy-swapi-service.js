export default class DummySwapiService {
    _people = [
        {
            id: 1,
            name: 'Bilbo Baggince [TEST DATA]',
            gender: 'male',
            berthYear: 'long long ago',
            eyeColor: 'dark down'
        },
        {
            id: 1,
            name: 'Frodo Baggince [TEST DATA]',
            gender: 'male',
            berthYear: 'long ago',
            eyeColor: 'dark down'
        }
    ];

    _planet = [
        {
            id: 1,
            name: 'Earth [TEST DATA]',
            population: '7.530.000.000',
            rotationPeriod: '23 hours 56 seconds',
            diameter: '12.742 km'
        },
        {
            id: 1,
            name: 'Venus [TEST DATA]',
            population: 'not known',
            rotationPeriod: '243 days',
            diameter: '12.104 km'
        }
    ];

    _starships = [
        {
            id: 1,
            name: 'USS Enterprise [TEST DATA]',
            model: 'NCC-1703-C',
            manufacturer: 'Northrop',
            costInCredits: 'not known',
            crew: 1000,
            passengers: 50,
            cargoCapacity: 100
        },
        {
            id: 2,
            name: 'New Starship [TEST DATA]',
            model: 'BMS-300-NY',
            manufacturer: 'Northrop',
            costInCredits: 1000000,
            crew: 2000,
            passengers: 100,
            cargoCapacity: 120
        },
    ];

    getAllPeople = async () => {
        return this._people;
    };

    getPerson = async () => {
        return this._people[0];
    };

    getAllStarsips = async () => {
        return this._starships;
    };

    getStarship = async () => {
        return this._starships[0];
    };

    getAllPlanet = async () => {
        return this._planet;
    };

    getPlanet = async () => {
        return this._planet[0];
    };

    getPersonImage = ({ id }) => {
        return `${this._imageBase}/characters/${id}.jpg`
    };

    getStarshipImage = ({ id }) => {
        return `${this._imageBase}/starships/${id}.jpg`
    };

    getPlanetImage = ({ id }) => {
        return `${this._imageBase}/planets/${id}.jpg`
    };
}
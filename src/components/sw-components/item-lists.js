import ItemList from '../item-list';
import { withData, withSwapiService, compose, withChildFunction } from "../hoc-helpers";

const renderName = ({ name }) => <span>{ name }</span>;

const renderModelAndName = ({ model, name }) => <span>{ name } ({model})</span>;

//Создаем карту каждому списку данных для передачи конкретных методов из swapiService
const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople,
    };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets,
    };
};

const mapStarshipsMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships,
    };
};


//Оборачиваем наши списки, чтобы передать контекст и конкретные методы из swapiService,

const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderName),
)(ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipsMethodsToProps),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
};



import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from "../error-button";
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context";

import { PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from '../sw-components';

export default class App extends Component {

    swapiService = new SwapiService();
    //swapiService = new DummySwapiService();

    state = {
        hasError: false
    };

    componentDidCatch(error, info) {
        console.log('componentDidCatch');
        this.setState({ hasError: true });
    }

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div  className="stardb-app">
                        <Header />
                        <RandomPlanet />

                        <ErrorButton />

                        <PersonDetails itemId={11}/>
                        <PlanetDetails itemId={11}/>
                        <StarshipDetails itemId={10}/>

                        <PersonList />
                        <StarshipList />
                        <PlanetList />

                    </div>
                </SwapiServiceProvider>

            </ErrorBoundry>
        );
    }
};
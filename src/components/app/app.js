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

    /*
    * мы можем менять данные контекста, язык, цвет оформления и т.п.
    * для этого помещаем входные данные контекста value в state, меняем value на this.state.контекст
    * а в компонентах заменям
    * */

    state = {
        hasError: false,
        swapiService: new DummySwapiService()
    };

    componentDidCatch(error, info) {
        console.log('componentDidCatch');
        this.setState({ hasError: true });
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        });

    };

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div  className="stardb-app">
                        <Header
                            onServiceChange={this.onServiceChange}
                        />
                        <RandomPlanet />

                        <ErrorButton />

                        <PersonDetails itemId={11}/>
                        <PlanetDetails itemId={9}/>
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
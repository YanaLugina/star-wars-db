import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from "../error-button";
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';
import { SwapiServiceProvider } from "../swapi-service-context";

import { BrowserRouter as Router, Route } from 'react-router-dom';



export default class App extends Component {

    /*
    * мы можем менять данные контекста, язык, цвет оформления и т.п.
    * для этого помещаем входные данные контекста value в state, меняем value на this.state.контекст
    * а в компонентах заменям
    * */

    state = {
        hasError: false,
        swapiService: new SwapiService()
    };

    componentDidCatch(error, info) {
        console.log('componentDidCatch');
        this.setState({ hasError: true });
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof DummySwapiService ?
                SwapiService : DummySwapiService;

            return {
                swapiService: new Service()
            };
        });

    };

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div  className="stardb-app">
                            <Header
                                onServiceChange={this.onServiceChange} />
                            <RandomPlanet />

                            {/*<ErrorButton />*/}

                            <Route path="/"
                                   render={() => <h2>Welcome to StarDB</h2>}
                                   exact
                            />
                            <Route path="/people"
                                   render={() => <h2>Peoples</h2>}
                                   exact
                            />
                            <Route path="/people" component={PeoplePage}/>
                            <Route path="/planets" component={PlanetsPage}/>
                            <Route path="/starships" component={StarshipsPage}/>

                        </div>
                    </Router>

                </SwapiServiceProvider>

            </ErrorBoundry>
        );
    }
};
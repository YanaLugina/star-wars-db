import React, { Component } from 'react';

import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";

import './app.css';
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    swapiService = new SwapiService();

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

        return (
            <div  className="stardb-app">
                <Header />
                <RandomPlanet />

                <ErrorButton />

                <PeoplePage />

            </div>
        );
    }
};
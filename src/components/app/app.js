import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    SecretPage,
    LoginPage
} from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';
import { StarshipDetails } from '../sw-components';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';



export default class App extends Component {

    /*
    * мы можем менять данные контекста, язык, цвет оформления и т.п.
    * для этого помещаем входные данные контекста value в state, меняем value на this.state.контекст
    * а в компонентах заменям
    * */

    state = {
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin =() => {
        this.setState({
            isLoggedIn: true
        });
    };

    componentDidCatch(error, info) {
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

        const { isLoggedIn } = this.state;

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

                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact />

                                <Route path="/people/:id?" component={PeoplePage}/>

                                <Route path="/planets" component={PlanetsPage}/>

                                <Route path="/starships" component={StarshipsPage} exact />
                                {/* Для компонентов ниже по иерархии для передачи props withRouter компонент необходимо будет обернуть в HOC withRouter */}
                                <Route path="/starships/:id"
                                       render={ ({ match })=> {
                                           const { id } = match.params;
                                           return <StarshipDetails itemId={id}  />;
                                       }} />

                                <Route path="/secret"
                                       render={ () => {
                                           return (<SecretPage isLoggedIn={isLoggedIn}/>);
                                       } } />

                                <Route path="/login"
                                       render={ () => {
                                           return (<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>);
                                       } } />
                                <Route  render={ () => {
                                    return (<h2>Error 404: Page not found!</h2>);
                                }} />
                            </Switch>

                        </div>
                    </Router>

                </SwapiServiceProvider>

            </ErrorBoundry>
        );
    }
};
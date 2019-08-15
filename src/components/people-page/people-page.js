import React, { Component } from 'react';

import './people-page.css';
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry/error-boundry";

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople} >
                { (i) => (
                    `${i.name} (${i.birthYear})`
                )}
            </ItemList>
        );

        /*const personDetails = (
            <ErrorBoundry>
                <ItemDetails
                    personId={this.state.selectedPerson}
                />
            </ErrorBoundry>

        );*/

        const { getPerson, getStarship, getStarshipImage, getPersonImage } = this.swapiService;

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={11}
                    getData={getPerson}
                    getImageUrl={getPersonImage} >

                    <Record field="gender" label="Gender" />
                    <Record field="eyeColor" label="Eye Color" />
                    <Record field="birthYear" label="Birth Year" />
                </ItemDetails>
            </ErrorBoundry>

        );

        const starshipDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={11}
                    getData={getStarship}
                    getImageUrl={getStarshipImage}
                >
                    <Record field="model" label="Model" />
                    <Record field="length" label="Length" />
                    <Record field="costInCredits" label="Cost" />
                </ItemDetails>
            </ErrorBoundry>

        );
        {/*<Row left={itemList} right={personDetails} />*/}
        return (

            <Row left={personDetails} right={starshipDetails} />
        )
    }
}
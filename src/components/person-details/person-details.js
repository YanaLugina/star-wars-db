import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";


export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps){
        if(this.props.personId !== prevProps.personId) {
            this.setState({
                loading: true
            });
            this.updatePerson();
        }
    }

    // Function for processing Errors
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    onPersonLoaded = (person) => {
        this.setState({
            person,
            loading: false,
            error: false
        })
    };

    updatePerson = () => {
        const { personId } = this.props;
        if(!personId){
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError)
    };

    render() {

        if(this.state.loading) {
            return <Spinner />;
            //return <span>Select a person from a list</span>
        }

        const { person, error } = this.state;
        const {id, name, gender, birthYear, eyeColor} = person;

        if(error) {
            return 'Ooops, error in person-details';
        }

        return (
            <div className="person-details card">
                <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                     alt="value"
                     className="person-image" />

                <div className="card-body">
                    <h4>{ name } {this.props.personId}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">
                                Gender
                            </span>
                            <span>{ gender }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">
                                Birth Year
                            </span>
                            <span>{ birthYear }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">
                                Eye Color
                            </span>
                            <span>{ eyeColor }</span>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
};

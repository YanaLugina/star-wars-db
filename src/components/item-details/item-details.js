import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";


export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId) {
            this.setState({
                loading: true
            });
            this.updateItem();
        }
    }

    // Function for processing Errors
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;
        if(!itemId){
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    error: false,
                    image: getImageUrl(item)
                })
            })
            .catch(this.onError)
    };

    render() {
        const { item, error, image, loading } = this.state;
        if(loading) {
            //return <Spinner />;
            return <span>Select a item from a list</span>
        }
        const {id, name, gender, birthYear, eyeColor} = item;

        if(error) {
            return 'Ooops, error in item-details';
        }

        return (
            <div className="person-details card">
                <img src={image}
                     alt="value"
                     className="person-image" />

                <div className="card-body">
                    <h4>{ name } {this.props.itemId}</h4>
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
                        <p>
                            <ErrorButton/>
                        </p>
                    </ul>

                </div>
            </div>
        );
    }
};

import React, { Component } from 'react';

import './item-details.css';
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}:</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {


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
            return <Spinner />;
            //return <span>Select a item from a list</span>
        }
        const { name } = item;

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
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                        <p>
                            <ErrorButton/>
                        </p>
                    </ul>

                </div>
            </div>
        );
    }
};

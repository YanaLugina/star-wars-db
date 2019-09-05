import React from 'react';
import { PersonDetails, PersonList } from "../sw-components";
import Row from "../row";

const PeoplePage = ({ match, history }) => {

    const { id } = match.params;

    return (
        <Row
            left={<PersonList onItemSelected={ (itemId) => history.push(itemId) }/>}
            right={<PersonDetails itemId={id || 1}/>}
        />
    );
};

export default PeoplePage;
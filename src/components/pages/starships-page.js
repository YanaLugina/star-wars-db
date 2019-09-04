import React from 'react';
import { StarshipList } from '../sw-components';

const StarshipsPage = ({ history }) =>  {
    return (
        <StarshipList
            onItemSelected={(itemId) => {
                history.push(`/starships/${itemId}`);
            }} />
    );
};

export default StarshipsPage;
import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const PersonDetails = ({ itemId, swapiService }) => {
    const { getPerson, getPersonImage } = swapiService;

    return (
        <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getPersonImage} >

            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />

        </ItemDetails>
    );
};

//Обязанность получать данные из контекста мы вынесли в компонент высшего порядка

export default withSwapiService(PersonDetails);
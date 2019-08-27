import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const PersonDetails = (props) => {
    return (
        <ItemDetails {... props}>
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />

        </ItemDetails>
    );
};

// карта необходимых методов получаемых из swapiService
const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};

// Обязанность получать данные из контекста мы вынесли в компонент высшего порядка
// Оборачивая данные компонентом hoc мы передаем ему контекст и карту данных для передачи конкретного метода

export default withSwapiService(PersonDetails, mapMethodsToProps);
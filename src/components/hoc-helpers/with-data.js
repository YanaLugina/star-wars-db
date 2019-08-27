import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorIndicator from '../error-indicator';


// компонент hoc который получает данные для представления из пропс и следит за жизненным циклом этих данных
// необходим для абстрагирования и возмоджности дальнейшего тестирования компонентов

const withData = (View) => {
    return class extends Component {

        state = {
            data: null
        };

        componentDidMount() {
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        }

        render() {

            const { data } = this.state;

            if (!data) {
                return <Spinner />;
            }

            return <View {...this.props} data={data}/>;
        }
    };
};

export default withData;
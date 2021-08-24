import React, {Component} from "react";
import Axios from "axios";
import SelectForField from "../SelectForField";
import {API} from "../../../../../const";
import apiRequest from '../../../../../services/api_connect'

class ClassSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: null
        }
    }

    componentDidMount() {
        this.loadOptions();
    }

    loadOptions() {
        apiRequest(API.CLASS).then((response) => {
            let options = response.data.map((catClass) => {
                return {value: catClass.id, label: catClass.nameRU}
            });
            options.unshift({value: null, label: "Не указан"})
            this.setState({
                options: options
            });
        });
    }

    render() {
        return (
            <SelectForField
                options={this.state.options}
                {...this.props}/>
        );
    }
}

export default ClassSelect;
import React, {Component} from "react";
import Axios from "axios";
import SelectForField from "../SelectForField";
import {API} from "../../../../../const";
import apiRequest from '../../../../../services/api_connect'

class ColorCodeSelect extends Component {
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
        let params = this.props.params ? this.props.params : {};
        apiRequest(API.COLOR_CODE, {params: params}).then((response) => {
            let options = response.data.map((colorCode) => {
                return {value: colorCode.id, label: colorCode.nameRU + " (" + colorCode.code + ")"}
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

export default ColorCodeSelect;
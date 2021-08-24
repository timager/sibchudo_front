import React, {Component} from "react";
import SelectForField from "../SelectForField";
import Axios from "axios";
import {getCatFullName} from "../../../Cat/CatName/CatName";
import {API} from "../../../../../const";
import apiRequest from '../../../../../services/api_connect'

class LitterSelect extends Component {

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
        apiRequest(API.LITTER(), {params: {order: {birthday: "desc"}}}).then((response) => {
            this.setState({
                options: response.data.map((litter) => {
                    let label = "Помет(" + litter.letter + ") ";
                    label += (new Date(litter.birthday)).toLocaleDateString("ru");
                    label += " " + (litter.mother ? getCatFullName(litter.mother).join(" ") : "");
                    label += " " + (litter.father ? getCatFullName(litter.father).join(" ") : "");
                    return {value: litter.id, label: label}
                })
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

export default LitterSelect;

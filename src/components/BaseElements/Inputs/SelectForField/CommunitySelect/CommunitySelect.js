import React, {Component} from "react";
import Axios from "axios";
import SelectForField from "../SelectForField";
import {API} from "../../../../../const";
import apiRequest from '../../../../../services/api_connect'


class CommunitySelect extends Component {
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
        apiRequest(API.COMMUNITY).then((response) => {
            let options = response.data.map((community) => {
                return {value: community.id, label: community.name}
            });
            if (this.props.params?.nullable) {
                options.unshift({value: null, label: "Не указан"});
            }
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

export default CommunitySelect;
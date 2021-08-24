import React, {Component} from "react";
import Select from "react-select";

class SelectForField extends Component {
    render() {
        return (
            <Select
                options={this.props.options}
                name={this.props.field.name}
                value={this.props.options ? this.props.options.find(option => option.value === this.props.field.value) : ''}
                onChange={(option) => this.props.form.setFieldValue(this.props.field.name, option.value)}
            />
        );
    }
}

export default SelectForField;
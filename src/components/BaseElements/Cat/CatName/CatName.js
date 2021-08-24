import React, {Component} from "react";

export function getCatFullName(cat) {
    if(!cat){
        return ["..."];
    }
    let fullNameArray = [];
    if (cat.title) {
        fullNameArray.push(cat.title.code);
    }
    fullNameArray.push(cat.name);
    fullNameArray.push(cat.litter?.community.name);
    if (cat.community) {
        fullNameArray.push(" из питомника " + cat.community.name);
    }
    return fullNameArray;

}

class CatName extends Component {
    render() {
        let callback = this.props.breaks ?
            (item, i)=>{return <p key={i}>{item}</p>}:
            (item)=>{return item + " "};

        return (
            <span className={this.props.className}>
                {getCatFullName(this.props.cat).map(callback)}
            </span>
        );
    }
}

export default CatName;

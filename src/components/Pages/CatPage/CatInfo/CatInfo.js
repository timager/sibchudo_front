import React, {Component} from "react";
import CatColor from "../../../BaseElements/Cat/CatColor/CatColor";
import CatAge from "../../../BaseElements/Cat/CatAge/CatAge";
import CatGender from "../../../BaseElements/Cat/CatGender/CatGender";
import Button from "../../../BaseElements/Button/Button";

class CatInfo extends Component {
    render() {
        let name = <p>Имя: {this.props.cat.name}</p>;
        let birthday = <p>Дата рождения: <CatAge birthday={this.props.cat.litter.birthday}/></p>;
        let gender = <p>Пол: <CatGender gender={this.props.cat.gender}/></p>;
        let color = <p>Окрас: <CatColor color={this.props.cat.color}/></p>;
        let community = this.props.cat.community ? this.props.cat.community.name : this.props.cat.litter.community.name;
        let title = '';
        if(this.props.cat.title){
            title = <p>Титул: {this.props.cat.title.nameRU}</p>
        }
        return (
            <div>
                <h2>Информация о животном</h2>
                {name}
                {birthday}
                {gender}
                {title}
                {color}
                <p>Питомник: {community}</p>
                <Button color={"green"} href={"/litter/"+this.props.cat.litter.id}>Посмотреть помет</Button>
            </div>
        );
    }
}

export default CatInfo;

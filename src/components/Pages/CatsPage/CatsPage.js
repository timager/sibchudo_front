import React, {Component} from "react";
import AbstractPage from "../AbstractPage/AbstractPage";
import TitleH2 from "../../BaseElements/TitleH2/TitleH2";
import "./CatsPage.css";
import CatsList from "./CatsList/CatsList";

class CatsPage extends Component {

    render() {
        return (
            <AbstractPage title={"Кошки"}>
                <TitleH2 text={"Наши кошки"}/>
                <CatsList countCatOnPage={12}/>
            </AbstractPage>
        );
    }
}

export default CatsPage;
import React, {Component} from "react";
import AdminAbstractPage from "../AdminAbstractPage/AdminAbstractPage";
import AdminCatToolbar from "./AdminCatTollbar/AdminCatToolbar";
import TitleH2 from "../../../BaseElements/TitleH2/TitleH2";
import AdminCatTable from "./AdminCatTable/AdminCatTable";
import Button from "../../../BaseElements/Button/Button";
import "./AdminCatPage.css";
import {ModalContext} from "../../../App/App";
import CatEditForm from "./CatEditForm/CatEditForm";

export let catUpdater = () => {};
export let setCatUpdater = (newCatUpdater) => {
    catUpdater = newCatUpdater;
}

class AdminCatsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formState: null
        };
    }

    render() {
        return (
            <ModalContext.Consumer>{
                modal => <AdminAbstractPage>
                    <TitleH2 text={"Кошки"}/>
                    <p>Здесь можно настроить список животных</p>
                    <div className={"mb_20"}>
                        <Button onClick={() => {
                            modal.openModal(<CatEditForm modal={modal}/>)
                        }} color={"green"}>Добавить животное</Button>
                    </div>
                    <AdminCatTable
                        formState={this.state.formState}
                        openEditModal={(cat) => {
                            modal.openModal(<CatEditForm cat={cat} modal={modal}/>)
                        }}
                        toolbar={AdminCatToolbar}
                        countCatOnPage={30}/>
                </AdminAbstractPage>
            }
            </ModalContext.Consumer>
        );
    }
}

export default AdminCatsPage;

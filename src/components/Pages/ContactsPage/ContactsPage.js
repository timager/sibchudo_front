import React, {Component} from "react";
import AbstractPage from "../AbstractPage/AbstractPage";
import TitleH2 from "../../BaseElements/TitleH2/TitleH2";
import "./ContactsPage.css";
import {faPhone, faMailBulk} from "@fortawesome/free-solid-svg-icons";
import {faInstagram, faVk} from "@fortawesome/free-brands-svg-icons";
import Contact from "./Contact/Contact";
import Img from 'react-image';
import leader from "./assets/leader.png";

class ContactsPage extends Component {
    render() {
        return (
            <AbstractPage title={"Контакты"}>
                <TitleH2 text={"Как с нами связаться"}/>
                <p>Ирина Владимировна – руководитель питомника и ветврач</p>
                <div className={"contacts"}>
                    <div className={"avatar"}>
                        <Img src={leader}/>
                    </div>
                    <div>
                        <Contact icon={faPhone} text={"+7 (921) 376-28-67"} url={"tel:+7(921)376-28-67"}/>
                        <Contact icon={faPhone} text={"+7 (812) 684-58-04"} url={"tel:8(812)684-58-04"}/>
                        <Contact icon={faMailBulk} text={"verliokamaskarad@mail.ru"}
                                 url={"mailto:verliokamaskarad@mail.ru"}/>
                        {/*<Contact icon={faInstagram} text={"Мы в instagram"}*/}
                        {/*         url={"https://www.instagram.com/sib.chudo/"}/>*/}
                        <Contact icon={faVk} text={"Мы в вконтакте"} url={"https://vk.com/sib_chudo"}/>
                    </div>
                </div>
            </AbstractPage>
        );
    }
}

export default ContactsPage;
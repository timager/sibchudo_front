import React, {Component} from "react";
import AbstractPage from "../AbstractPage/AbstractPage";
import TitleH2 from "../../BaseElements/TitleH2/TitleH2";
import "./LitterPage.css";
import LitterName from "../../BaseElements/Litter/LiiterName/LitterName";
import CatPreview from "../../BaseElements/Cat/CatPreview/CatPreview";
import CatTable from "../../BaseElements/Cat/CatTable/CatTable";
import {API} from "../../../const";
import apiRequest from '../../../services/api_connect'


const litterTemplate = {
    id: null,
    letter: "...",
    mother: null,
    father: null,
    birthday: null,
    community: null
};

class LitterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            litter: null
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadLitter();
        }
    }

    componentDidMount() {
        this.loadLitter();
    }

    render() {
        let litter;
        if (!this.state.litter) {
            litter = litterTemplate;
        } else {
            litter = this.state.litter;
        }
        let kittens = this.state.kittens ? this.state.kittens : [];
        return (
            <AbstractPage title={'Помет "' + litter.letter + '"'}>
                <TitleH2 text={<LitterName litter={litter}/>}/>
                <div className={"litter_parent"}>
                    <div>
                        <p>Отец:</p>
                        <CatPreview cat={litter.father}/>
                    </div>
                    <div>
                        <p>Мать:</p>
                        <CatPreview cat={litter.mother}/>
                    </div>
                </div>
                <CatTable cats={kittens}/>
            </AbstractPage>
        );
    }

    loadLitter() {
        let self = this;
        apiRequest(API.LITTER(this.props.match.params.id)).then(function (result) {
            if (result.data != null) {
                self.setState({litter: result.data});
                apiRequest(API.CAT(), {
                    params: {
                        search: {"l.id": result.data.id}
                    }
                }).then(
                    function (kittensData) {
                        self.setState({kittens: kittensData.data});
                    }
                );
            } else {
                document.location.href = "/404";
            }
        });
    }
}

export default LitterPage;

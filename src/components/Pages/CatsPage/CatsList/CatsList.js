import React, {Component} from "react";
import CatPreview from "../../../BaseElements/Cat/CatPreview/CatPreview";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons"
import Axios from "axios";
import "./CatsList.css";
import {API} from "../../../../const";
import apiRequest from '../../../../services/api_connect'

class CatsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            offset: 0,
            cats: []
        };
    }

    loadCats() {
        let self = this;
        apiRequest(API.CAT('count')).then(
            function (response) {
                self.setState({
                    pages: Math.ceil(response.data / self.props.countCatOnPage)
                });
                apiRequest(API.CAT(), {
                    params: {
                        limit: self.props.countCatOnPage,
                        offset: self.state.offset,
                        order: {name: "asc"}
                    }
                }).then(
                    function (cats) {
                        self.setState({cats: cats.data});
                    }
                );
            }
        );
    }

    componentDidMount() {
        this.loadCats();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props))
            this.loadCats();
    }

    render() {
        return (
            <>
                <div className={"cats_list"}>
                    {this.state.cats.map((cat) => <CatPreview edit={this.props.edit} handler={() => {
                        this.loadCats()
                    }} toolbar={this.props.toolbar} key={cat.id} cat={cat}/>)}
                </div>
                <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
                    nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    onPageChange={(data) => {
                        let selected = data.selected;
                        let offset = Math.ceil(selected * this.props.countCatOnPage);
                        this.setState({
                            offset: offset
                        }, this.loadCats);
                    }}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageCount={this.state.pages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}/>
            </>
        );
    }
}

export default CatsList;
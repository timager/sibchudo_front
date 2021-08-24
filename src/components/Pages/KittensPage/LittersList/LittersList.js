import React, {Component} from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import LitterPreview from "../../../BaseElements/Litter/LitterPreview/LitterPreview";
import {API} from "../../../../const";
import apiRequest from '../../../../services/api_connect'

class LittersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            offset: 0,
            litters: []
        };
    }

    loadLitters() {
        let self = this;
        apiRequest(API.LITTER('count')).then(
            function (response) {
                self.setState({
                    pages: Math.ceil(response.data / self.props.countOnPage)
                });
                apiRequest(API.LITTER(), {
                    params: {
                        order: {birthday: "desc"},
                        limit: self.props.countOnPage,
                        offset: self.state.offset
                    }
                }).then(
                    function (litters) {
                        self.setState({litters: litters.data});
                    }
                );
            }
        );
    }

    componentDidMount() {
        this.loadLitters();
    }

    render() {
        return (
            <>
                <div className={"litters_list"}>
                    {this.state.litters.map((litter) => <LitterPreview key={litter.id} litter={litter}/>)}
                </div>
                <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
                    nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    onPageChange={(data) => {
                        let selected = data.selected;
                        let offset = Math.ceil(selected * this.props.countOnPage);
                        this.setState({
                            offset: offset
                        }, this.loadLitters);
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

export default LittersList;

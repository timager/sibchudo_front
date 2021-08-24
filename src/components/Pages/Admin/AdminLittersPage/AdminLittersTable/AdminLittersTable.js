import React, {Component} from "react";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faWrench} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import {API} from "../../../../../const";
import {Table, Tbody, Th, Thead, Tr} from "react-super-responsive-table";
import CatTableCell from "../../../../BaseElements/Cat/CatTable/CatTableCell/CatTableCell";
import CatAge from "../../../../BaseElements/Cat/CatAge/CatAge";
import CatName from "../../../../BaseElements/Cat/CatName/CatName";
import LitterToolbar from "../LitterTollbar/LitterToolbar";
import CatLink from "../../../../BaseElements/Link/CatLink";
import {setLitterUpdater} from "../AdminLittersPage";
import apiRequest from '../../../../../services/api_connect'

class AdminLittersTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            offset: 0,
            litters: []
        };
        this.loadLitters = this.loadLitters.bind(this);
        setLitterUpdater(this.loadLitters)
    }

    loadLitters() {
        let self = this;
        apiRequest(API.LITTER('count')).then(
            function (response) {
                self.setState({
                    pages: Math.ceil(response.data / self.props.countLitterOnPage)
                });
                apiRequest(API.LITTER(), {
                    params: {
                        limit: self.props.countLitterOnPage,
                        offset: self.state.offset,
                        order: {birthday: "desc"}
                    }
                }).then(
                    function (litters) {
                        let data = litters.data
                        self.setState({litters: data});
                    }
                );
            }
        );
    }

    componentDidMount() {
        this.loadLitters();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) this.loadLitters();
    }

    render() {
        return (
            <>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Буква</Th>
                            <Th>Дата</Th>
                            <Th>Отец</Th>
                            <Th>Мать</Th>
                            <Th>Котята</Th>
                            <Th><FontAwesomeIcon icon={faWrench}/></Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {this.state.litters.map(litter => this.litterRow(litter))}
                    </Tbody>
                </Table>
                <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
                    nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    onPageChange={(data) => {
                        let selected = data.selected;
                        let offset = Math.ceil(selected * this.props.countLitterOnPage);
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

    litterRow(litter) {
        return (
            <Tr key={litter.id}>
                <CatTableCell key={litter.id + "letter"}>
                    <CatLink url={"/litter/" + litter.id} target={"_blank"}>{litter.letter}</CatLink>
                </CatTableCell>
                <CatTableCell key={litter.id + "birthday"}><CatAge birthday={litter.birthday}/></CatTableCell>
                <CatTableCell key={litter.id + "father"}><CatName cat={litter.father}/></CatTableCell>
                <CatTableCell key={litter.id + "mother"}><CatName cat={litter.mother}/></CatTableCell>
                <CatTableCell key={litter.id + "cats"}>{litter.cats.length}</CatTableCell>
                <CatTableCell key={litter.id + "toolbar"}>
                    <LitterToolbar litter={litter} openEditModal={this.props.openEditModal}/>
                </CatTableCell>
            </Tr>
        );
    }
}

export default AdminLittersTable;

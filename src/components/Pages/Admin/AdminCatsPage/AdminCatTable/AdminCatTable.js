import React, {Component} from "react";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faWrench} from "@fortawesome/free-solid-svg-icons"
import Axios from "axios";
import {API} from "../../../../../const";
import {Table, Tbody, Th, Thead, Tr} from "react-super-responsive-table";
import CatTableCell from "../../../../BaseElements/Cat/CatTable/CatTableCell/CatTableCell";
import CatGender from "../../../../BaseElements/Cat/CatGender/CatGender";
import CatStatus from "../../../../BaseElements/Cat/CatStatus/CatStatus";
import CatColor from "../../../../BaseElements/Cat/CatColor/CatColor";
import AdminCatToolbar from "../AdminCatTollbar/AdminCatToolbar";
import "./AdminCatTable.css";
import CatAge from "../../../../BaseElements/Cat/CatAge/CatAge";
import CatLink from "../../../../BaseElements/Link/CatLink";
import {setCatUpdater} from "../AdminCatsPage";
import apiRequest from '../../../../../services/api_connect'

class AdminCatTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            offset: 0,
            cats: []
        };
        this.loadCats = this.loadCats.bind(this);
        setCatUpdater(this.loadCats);
    }

    loadCats() {
        let self = this;
        apiRequest(API.CAT("count")).then(
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
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) this.loadCats();
    }

    render() {
        return (
            <>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Имя</Th>
                            <Th>Пол</Th>
                            <Th>Дата рождения</Th>
                            <Th>Статус</Th>
                            <Th>Окрас</Th>
                            <Th><FontAwesomeIcon icon={faWrench}/></Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {this.state.cats.map(cat => this.catRow(cat))}
                    </Tbody>
                </Table>
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

    catRow(cat) {
        return (
            <Tr key={cat.id}>
                <CatTableCell key={cat.id + "name"}>
                    <CatLink url={"/cat/" + cat.id} target={"_blank"}>{cat.name}</CatLink>
                </CatTableCell>
                <CatTableCell key={cat.id + "gender"}>
                    <CatGender gender={cat.gender} icons={true}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "age"}>
                    <CatAge birthday={cat.litter.birthday}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "status"}>
                    <CatStatus status={cat.status}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "color"}>
                    <CatColor onlyCode={true} color={cat.color}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "toolbar"}>
                    <AdminCatToolbar cat={cat} openEditModal={this.props.openEditModal}/>
                </CatTableCell>
            </Tr>
        );
    }
}

export default AdminCatTable;

import React, {Component} from "react";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons"
import Axios from "axios";
import {BASE_URL} from "../../../../../const";
import {Table, Tbody, Th, Thead, Tr} from "react-super-responsive-table";
import CatTableCell from "../../../../BaseElements/Cat/CatTable/CatTableCell/CatTableCell";
import CatGender from "../../../../BaseElements/Cat/CatGender/CatGender";
import CatStatus from "../../../../BaseElements/Cat/CatStatus/CatStatus";
import CatColor from "../../../../BaseElements/Cat/CatColor/CatColor";
import AdminCatToolbar from "../AdminCatTollbar/AdminCatToolbar";
import "./AdminCatTable.css";

class AdminCatTable extends Component {

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
        Axios.post(BASE_URL + "/api/cat/count").then(
            function (response) {
                self.setState({
                    pages: Math.ceil(response.data / self.props.countCatOnPage)
                });
                Axios.post(BASE_URL + "/api/cat/get", {
                    limit: self.props.countCatOnPage,
                    offset: self.state.offset,
                    order: {name: "asc"}
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
                            <Th>Статус</Th>
                            <Th>Окрас</Th>
                            <Th>Управление</Th>
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
                <a target={"_blank"} href={"/cat/" + cat.id}><CatTableCell
                    key={cat.id + "name"}>{cat.name}</CatTableCell></a>
                <CatTableCell key={cat.id + "gender"}>
                    <CatGender gender={cat.gender} icons={true}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "status"}>
                    <CatStatus status={cat.status}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "color"}>
                    <CatColor color={cat.color}/>
                </CatTableCell>
                <CatTableCell key={cat.id + "btn"}>
                    <AdminCatToolbar cat={cat}/>
                </CatTableCell>
            </Tr>
        );
    }
}

export default AdminCatTable;
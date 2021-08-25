import React, { Component } from 'react'
import CatPreview from '../../../BaseElements/Cat/CatPreview/CatPreview'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faMars,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import './CatsList.css'
import { API } from '../../../../const'
import apiRequest from '../../../../services/api_connect'
import Button from '../../../BaseElements/Button/Button'

class CatsList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pages: 0,
      offset: 0,
      cats: [],
      order: null,
      onlyMale: false,
      onlyFemale: false,
      query: null,
      sort: '{ "c.name": "ASC" }',
    }
  }

  loadCats () {
    let self = this
    let params = {
      limit: self.props.countCatOnPage,
      offset: self.state.offset,
      sort: JSON.parse(self.state.sort),
      search: {},
    }
    if (self.state.query) {
      params.search['c.name'] = self.state.query
    }
    if (self.state.onlyFemale) {
      params.search['c.gender'] = 'female'
    }
    if (self.state.onlyMale) {
      params.search['c.gender'] = 'male'
    }
    apiRequest(API.CAT('count'), {
      params: params,
    }).then(
      function (response) {
        self.setState({
          pages: Math.ceil(response.data / self.props.countCatOnPage),
        })
        apiRequest(API.CAT(), {
          params: params,
        }).then(
          function (cats) {
            self.setState({ cats: cats.data })
          },
        )
      },
    )
  }

  componentDidMount () {
    this.loadCats()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props) ||
      JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.loadCats()
    }
  }

  render () {
    return (
      <>
        <div className={'search_row'}>
          <input placeholder={'Поиск'}
                 onChange={(e) => this.setState({
                   query: e.target.value.length >= 3
                     ? e.target.value
                     : null,
                 })}/>
          <Button color={this.state.onlyFemale ? 'green' : 'gray'}
                  onClick={() => this.setState(
                    { onlyFemale: !this.state.onlyFemale, onlyMale: false })}>Только
            кошки <FontAwesomeIcon
              icon={faVenus}/></Button>
          <Button color={this.state.onlyMale ? 'green' : 'gray'}
                  onClick={() => this.setState(
                    { onlyMale: !this.state.onlyMale, onlyFemale: false })}>Только
            коты <FontAwesomeIcon
              icon={faMars}/></Button>
          <select placeholder={'Сортировка'}
                  onChange={(e) => this.setState({ sort: e.target.value })}>
            <option value={'{ "c.name": "ASC" }'}>По алфавиту (а-я)</option>
            <option value={'{ "c.name": "DESC" }'}>По алфавиту (я-а)</option>
            <option value={'{ "l.birthday": "ASC" }'}>Сначала взрослые</option>
            <option value={'{ "l.birthday": "DESC" }'}>Сначала молодые</option>
          </select>
        </div>

        <div className={'cats_list'}>
          {this.state.cats.map(
            (cat) => <CatPreview edit={this.props.edit} handler={() => {
              this.loadCats()
            }} toolbar={this.props.toolbar} key={cat.id} cat={cat}/>)}
        </div>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
          nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          onPageChange={(data) => {
            let selected = data.selected
            let offset = Math.ceil(selected * this.props.countCatOnPage)
            this.setState({
              offset: offset,
            }, this.loadCats)
          }}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageCount={this.state.pages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}/>
      </>
    )
  }
}

export default CatsList
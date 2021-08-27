import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import LitterPreview
  from '../../../BaseElements/Litter/LitterPreview/LitterPreview'
import { API } from '../../../../const'
import apiRequest from '../../../../services/api_connect'

class LittersList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pages: 0,
      offset: 0,
      litters: [],
      sort: '{ "l.birthday": "DESC" }',
      father: null,
      mother: null,
    }
  }

  loadLitters () {
    let self = this
    let params = {
      sort: self.state.sort,
      limit: self.props.countOnPage,
      offset: self.state.offset,
      search: {},
      filters: { only_with_parents: true },
    }

    if (self.state.father) {
      params.search['f.name'] = self.state.father
    }
    if (self.state.mother) {
      params.search['m.name'] = self.state.mother
    }

    apiRequest(API.LITTER('count'), { params: params }).then(
      function (response) {
        self.setState({
          pages: Math.ceil(response.data / self.props.countOnPage),
        })
        apiRequest(API.LITTER(), {
          params: params,
        }).then(
          function (litters) {
            self.setState({ litters: litters.data })
          },
        )
      },
    )
  }

  componentDidMount () {
    this.loadLitters()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props) ||
      this.state.mother !== prevState.mother ||
      this.state.father !== prevState.father ||
      this.state.sort !== prevState.sort) {
      this.loadLitters()
    }
  }

  render () {
    return (
      <>
        <div className={'search_row'}>
          <input placeholder={'Мать'}
                 onChange={(e) => this.setState({
                   mother: e.target.value.length >= 3
                     ? e.target.value
                     : null,
                 })}/>
          <input placeholder={'Отец'}
                 onChange={(e) => this.setState({
                   father: e.target.value.length >= 3
                     ? e.target.value
                     : null,
                 })}/>
          <select placeholder={'Сортировка'}
                  onChange={(e) => this.setState({ sort: e.target.value })}>
            <option value={'{ "l.birthday": "DESC" }'}>Сначала новые</option>
            <option value={'{ "l.birthday": "ASC" }'}>Сначала старые</option>
            <option value={'{ "l.letter": "ASC" }'}>По алфавиту (а-я)</option>
            <option value={'{ "l.letter": "DESC" }'}>По алфавиту (я-а)</option>
          </select>
        </div>

        <div className={'litters_list'}>
          {this.state.litters.map(
            (litter) => <LitterPreview key={litter.id} litter={litter}/>)}
        </div>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
          nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          onPageChange={(data) => {
            let selected = data.selected
            let offset = Math.ceil(selected * this.props.countOnPage)
            this.setState({
              offset: offset,
            }, this.loadLitters)
          }}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageCount={this.state.pages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}/>
      </>
    )
  }
}

export default LittersList

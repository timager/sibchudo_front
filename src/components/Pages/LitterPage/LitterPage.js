import React, { Component } from 'react'
import AbstractPage from '../AbstractPage/AbstractPage'
import TitleH2 from '../../BaseElements/TitleH2/TitleH2'
import './LitterPage.css'
import LitterName from '../../BaseElements/Litter/LiiterName/LitterName'
import CatPreview from '../../BaseElements/Cat/CatPreview/CatPreview'
import CatTable from '../../BaseElements/Cat/CatTable/CatTable'
import { API, BASE_URL } from '../../../const'
import apiRequest from '../../../services/api_connect'
import Img from 'react-image'
import Loader from 'react-loader-spinner'
import defaultCatImage from '../CatPage/assets/default-cat.jpg'

const litterTemplate = {
  id: null,
  letter: '...',
  mother: null,
  father: null,
  birthday: null,
  community: null,
}

class LitterPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      litter: null,
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.loadLitter()
    }
  }

  componentDidMount () {
    this.loadLitter()
  }

  render () {
    let litter
    if (!this.state.litter) {
      litter = litterTemplate
    }
    else {
      litter = this.state.litter
    }
    let kittens = this.state.kittens ? this.state.kittens : []
    let media = kittens.map(cat => cat.media).flat(Infinity)
    return (
      <AbstractPage title={'Помет "' + litter.letter + '"'}>
        <TitleH2 text={<LitterName litter={litter}/>}/>
        <div className={'litter_parent'}>
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
        <div className={'media'}>
          {
            media.
              map((item) => {
                return <Img
                  src={item.destination.startsWith('http')
                    ? item.destination
                    : BASE_URL + item.dir + item.destination}
                  key={item.id}
                  loader={<Loader unLoader={defaultCatImage} type={'Oval'}
                                  width={300} height={300}/>}/>
              })
          }
        </div>
      </AbstractPage>
    )
  }

  loadLitter () {
    let self = this
    apiRequest(API.LITTER(this.props.match.params.id)).then(function (result) {
      if (result.data != null) {
        self.setState({ litter: result.data })
        apiRequest(API.CAT(), {
          params: {
            search: { 'l.id': result.data.id },
          },
        }).then(
          function (kittensData) {
            self.setState({ kittens: kittensData.data })
          },
        )
      }
      else {
        document.location.href = '/404'
      }
    })
  }
}

export default LitterPage

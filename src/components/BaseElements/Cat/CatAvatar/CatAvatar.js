import React, { Component } from 'react'
import defaultCatImage from './assets/default-cat.png'
import Img from 'react-image'
import Loader from 'react-loader-spinner'
import './CatAvatar.css'
import CatLink from '../../Link/CatLink'
import { BASE_URL } from '../../../../const'

class CatAvatar extends Component {
  render () {
    let media = null
    if (this.props.media) {
      media = this.props.media
    }
    else {
      if (this.props.cat) {
        if (this.props.cat.avatar) {
          media = this.props.cat.avatar
        }
        else {
          if (this.props.cat.media) {
            media = this.props.cat.media[0]
          }
        }
      }
    }
    let destination = null
    if (media) {
      destination = media.destination.startsWith('http')
        ? media.destination
        : BASE_URL + media.dir + media.destination
    }
    let avatar =
      <div className={'cat_avatar'}>
        <Img
          src={destination}
          loader={<Loader type="Oval" width={200} height={200}/>}
          unloader={
            <Img src={defaultCatImage}
                 loader={<Loader type="Oval" width={200} height={200}/>}/>
          }
        />
      </div>
    if (this.props.clickable && this.props.cat) {
      avatar = <CatLink url={'/cat/' + this.props.cat.id}>{avatar}</CatLink>
    }
    return (avatar)
  }
}

export default CatAvatar

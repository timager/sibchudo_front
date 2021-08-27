import React, { Component } from 'react'
import LitterPreviewParents from './LitterPreviewParents/LitterPreviewParents'
import Button from '../../Button/Button'
import './LitterPreview.css'
import CatAvatar from '../../Cat/CatAvatar/CatAvatar'
import CatAge from '../../Cat/CatAge/CatAge'

class LitterPreview extends Component {
  render () {
    let media = this.props.litter.cats.map(cat => cat.media).flat(Infinity)
    return (
      <div className={'litter_preview'}>
        <div className={'litter_preview_title'}>
          <span>
            <span className={'big_letter'}>"{this.props.litter.letter}" </span>
            <CatAge birthday={this.props.litter.birthday} withoutAge/>
          </span>
          <LitterPreviewParents litter={this.props.litter}/>
          <Button color={'green'} href={'/litter/' + this.props.litter.id}>Узнать
            подробнее</Button>
        </div>
        <div className={'litter_preview_media'}>{
          media.slice(0, 3).
            map(media => <CatAvatar media={media} key={media.id}/>)
        }</div>
      </div>
    )
  }
}

export default LitterPreview
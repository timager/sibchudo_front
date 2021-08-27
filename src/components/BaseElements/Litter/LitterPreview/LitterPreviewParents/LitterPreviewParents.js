import React, { Component } from 'react'
import CatName from '../../../Cat/CatName/CatName'
import './LitterPreviewParents.css'

class LitterPreviewParents extends Component {
  render () {
    let mother = this.props.litter.mother
    let father = this.props.litter.father
    return (
      <div className={'litter_preview_parents'}>
        <span>
          Мать: <CatName className={'litter_preview_parents_cat_name'}
                         cat={mother}/>
          <br/>
          Отец: <CatName className={'litter_preview_parents_cat_name'}
                         cat={father}/>
        </span>
      </div>
    )
  }
}

export default LitterPreviewParents
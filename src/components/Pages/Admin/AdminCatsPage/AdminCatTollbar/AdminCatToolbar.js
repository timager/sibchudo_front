import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { API } from '../../../../../const'
import './AdminCatToolbar.css'
import { catUpdater } from '../AdminCatsPage'
import { ModalContext } from '../../../../App/App'
import MediaEditorForm from '../../MediaEditorForm/MediaEditorForm'
import apiRequest from '../../../../../services/api_connect'

class AdminCatToolbar extends Component {
  constructor (props) {
    super(props)
    this.deleteCat = this.deleteCat.bind(this)
  }

  render () {
    return (
      <div className={'cat_toolbar'}>
        <div className={'color_green'} onClick={() => {
          this.props.openEditModal(this.props.cat)
        }}><FontAwesomeIcon icon={faEdit}/></div>
        <ModalContext.Consumer>
          {
            modal => <div className={'color_blue'} onClick={() => {
              modal.openModal(<MediaEditorForm type={'cats'}
                                               catId={this.props.cat.id}/>,
              )
            }}><FontAwesomeIcon icon={faImage}/></div>
          }
        </ModalContext.Consumer>
        <div onClick={this.deleteCat} className={'color_red'}><FontAwesomeIcon
          icon={faTrash}/></div>
      </div>
    )
  }

  deleteCat () {
    let conf = window.confirm(
      'Вы уверены, что хотите удалить котика ' + this.props.cat.name)
    if (conf) {
      apiRequest(API.CAT(this.props.cat.id), {}, 'DELETE').then(res => { // then print response status
        catUpdater()
      }).catch(e => alert(e))
    }
  }
}

export default AdminCatToolbar

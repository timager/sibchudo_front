import React, { Component } from 'react'
import AdminAbstractPage from '../AdminAbstractPage/AdminAbstractPage'
import TitleH2 from '../../../BaseElements/TitleH2/TitleH2'
import Button from '../../../BaseElements/Button/Button'
import AdminLittersTable from './AdminLittersTable/AdminLittersTable'
import { ModalContext } from '../../../App/App'
import LitterEditForm from './LitterEditForm/LitterEditForm'

export let litterUpdater = () => {}
export let setLitterUpdater = (newLitterUpdater) => {
  litterUpdater = newLitterUpdater
}

class AdminLittersPage extends Component {
  render () {
    return (
      <ModalContext.Consumer>{
        modal => <AdminAbstractPage>
          <TitleH2 text={'Пометы'}/>
          <p>Здесь можно настроить список пометов</p>
          <div className={'mb_20'}>
            <Button color={'green'}
                    onClick={() => modal.openModal(<LitterEditForm
                      modal={modal}/>)}>Добавить
              помет</Button>
          </div>
          <AdminLittersTable countLitterOnPage={20} openEditModal={(litter) => {
            modal.openModal(<LitterEditForm litter={litter} modal={modal}/>)
          }}/>
        </AdminAbstractPage>
      }
      </ModalContext.Consumer>
    )
  }
}

export default AdminLittersPage

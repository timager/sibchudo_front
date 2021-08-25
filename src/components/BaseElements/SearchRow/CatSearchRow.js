import React, { Component } from 'react'
import Button from '../Button/Button'
import './SearchRow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'

class CatSearchRow extends Component {
  render () {
    return (
      <div className={'search_row'}>
        <input placeholder={'Поиск'}/>
        <Button color={'green'}>Кошки <FontAwesomeIcon icon={faVenus}/></Button>
        <Button color={'green'}>Коты <FontAwesomeIcon icon={faMars}/></Button>
        <select placeholder={'Сортировка'}>
          <option value={{ name: 'ASC' }}>По алфавиту</option>
          <option value={{ birthday: 'DESC' }}>Сначала взрослые</option>
          <option value={{ birthday: 'ASC' }}>Сначала молодые</option>
        </select>
      </div>
    )
  }
}

export default CatSearchRow

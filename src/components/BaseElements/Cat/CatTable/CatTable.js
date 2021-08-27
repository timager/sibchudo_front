import React, { Component } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Button from '../../Button/Button'
import CatColor from '../CatColor/CatColor'
import CatGender from '../CatGender/CatGender'
import CatStatus from '../CatStatus/CatStatus'

class CatTable extends Component {

  catRow (cat) {
    return (
      <Tr key={cat.id}>
        <Td key={cat.id + 'name'}>{cat.name}</Td>
        <Td key={cat.id + 'gender'}><CatGender gender={cat.gender}/></Td>
        <Td key={cat.id + 'status'}><CatStatus status={cat.status}/></Td>
        <Td key={cat.id + 'color'}><CatColor color={cat.color}/></Td>
        <Td key={cat.id + 'btn'}>
          <Button color={'green'} href={'/cat/' + cat.id}>Подробнее</Button>
        </Td>
      </Tr>
    )
  }

  render () {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Имя</Th>
            <Th>Пол</Th>
            <Th>Статус</Th>
            <Th>Окрас</Th>
          </Tr>
        </Thead>
        <Tbody>
          {this.props.cats.map(cat => this.catRow(cat))}
        </Tbody>
      </Table>
    )
  }
}

export default CatTable

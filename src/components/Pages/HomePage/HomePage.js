import React, { Component } from 'react'// import CatSlider from
                                         // "./CatSlider/CatSlider";

import AbstractPage from '../AbstractPage/AbstractPage'
import TitleH2 from '../../BaseElements/TitleH2/TitleH2'
import './HomePage.css'
import Button from '../../BaseElements/Button/Button'

class HomePage extends Component {
  render () {
    return (
      <AbstractPage
        title={'Главная - Питомник «Сибирское Чудо» – Коллективный питомник сибирских кошек'}>
        <div className={'flex'}>
          <TitleH2 text={'О питомнике'}/>
          <Button color={'green'} href={'/about'}>Подробнее</Button>
        </div>
        <div className={'block'}>
          <p>
            «Сибирское Чудо» – Коллективный питомник сибирских кошек
            Мы рады приветствовать вас на сайте сибирских кошек колорных и
            традиционных окрасов.
          </p>
          <p>
            Наш питомник заслуженно является одним из самых крупных коллективных
            питомников в России. Он
            зарегистрирован по двум системам WCF и FIFE.
          </p>
        </div>

        <div className={'flex'}>
          <TitleH2 text={'О наших кошках'}/>
          <Button color={'green'} href={'/cats'}>Все кошки</Button>
        </div>
        <div className={'block'}>
          <div className={'cat_description'}>
            Все наши животные привиты и имеют документы. Коты и кошки живут у
            своих хозяев. Все наши
            животные социализированы и отлично ладят с другими кошками. Наши
            кошки снимаются в рекламе и приносят победы на выставках!
          </div>
        </div>

        <div className={'flex'}>
          <TitleH2 text={'Наши котята'}/>
          <Button color={'green'} href={'/kittens'}>Все котята</Button>
        </div>
        <div className={'block'}>
        </div>

        <TitleH2 text={'Наши достижения'}/>
        <div className={'block'}>
        </div>
      </AbstractPage>
    )
  }
}

export default HomePage

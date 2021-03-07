import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import HomePage from '../Pages/HomePage/HomePage'
import CatPage from '../Pages/CatPage/CatPage'
import CatsPage from '../Pages/CatsPage/CatsPage'
import AdminMainPage from '../Pages/Admin/AdminMainPage/AdminMainPage'
import KittensPage from '../Pages/KittensPage/KittensPage'
import ContactsPage from '../Pages/ContactsPage/ContactsPage'
import AdminAuthPage from '../Pages/Admin/AdminAuthPage/AdminAuthPage'
import AdminCatsPage from '../Pages/Admin/AdminCatsPage/AdminCatsPage'
import LitterPage from '../Pages/LitterPage/LitterPage'
import { AboutCats } from '../Pages/AboutPage/AboutCats'
import Page404 from '../Pages/404/Page404'
import Page404Admin from '../Pages/404/Page404Admin'
import AdminLittersPage from '../Pages/Admin/AdminLittersPage/AdminLittersPage'

class MainRouter extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" children={<HomePage/>}/>
          <Route exact path="/cats" children={<CatsPage/>}/>
          <Route exact path="/kittens" children={<KittensPage/>}/>
          <Route exact path="/cat/:id" component={CatPage}/>
          <Route exact path="/litter/:id" component={LitterPage}/>
          <Route exact path="/contacts" children={<ContactsPage/>}/>
          <Route exact path="/admin" children={<AdminAuthPage/>}/>
          <Route exact path="/admin/main" children={<AdminMainPage/>}/>
          <Route exact path="/admin/cats" children={<AdminCatsPage/>}/>
          <Route exact path="/admin/litters" children={<AdminLittersPage/>}/>
          <Route exact path='/admin/:all' children={<Page404Admin/>}/>
          <Route exact path="/about" component={AboutCats}/>
          <Route children={<Page404/>}/>
        </Switch>
      </Router>
    )
  }
}

export default MainRouter

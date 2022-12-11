import React from 'react'
// import { useState, useEffect } from 'react'
// import { useQuery, gql } from '@apollo/client'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import BrowseAllBooks from '../BrowseAllBooks/BrowseAllBooks'
import SingleBookView from '../SingleBookView/SingleBookView'
import AddBook from '../AddBook/AddBook'
import PageNotFound from '../PageNotFound/PageNotFound'
import logo from '../../Images/bookmarked-logo.png'
import './App.css'

const App = () => {
  let location = useLocation()
  const homeLink = location.pathname !== "/" && <Link data-cy="return-home-text" to="/">Return Home</Link>
  const browseLink = location.pathname !== "/browse" && location.pathname !== "/" && <Link data-cy="browse-text" to="/browse">Browse</Link>
  let pageName;
  const hasNumber = /\d/
  // const isBookPage = hasNumber.test(location.pathname);

  if (location.pathname === "/") {
    pageName = "My Bookshelf"
  } else if (location.pathname === "/browse") {
    pageName = "Browse All Books"
  } else if (location.pathname === "/add") {
    pageName = "Add a Book"
  } else if (location.pathname === "/id") {
    pageName = "Book View"
  }
  // else {
  //   pageName = "oops"
  // }
  //Once we have single book view working, test that lines 21 and 22 are functional

  return (
    <div>
      <nav data-cy='nav-bar' className='nav-bar'>
        <div className='app-info'>
          <img data-cy='logo-image' className='logo-image' src={logo} alt='logo design' />
          <div data-cy='app-info-container' className='app-info-container'>
            <div data-cy='app-name-tagline' className='app-name-tagline'>
              <h1>Bookmarked</h1>
              <h2>Where Book Lovers Gather</h2>
            </div>
            <h3 data-cy='page-name' className='page-name'>{pageName}</h3>
          </div>
        </div>
        <div data-cy='nav-links' className='nav-links'>
          <h3>{homeLink}</h3>
          <h3>{browseLink}</h3>
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" render={() => 
            <Dashboard />
          }/>
          <Route path="/browse" render={() => 
            <BrowseAllBooks />
          }/>
          <Route path="/add" render={() =>
            <AddBook />
          }/>
          <Route exact path="/:id" render={({match}) => 
            <SingleBookView id={match.params.id} />
          }/>
          <Route path="*" render={() => 
            <PageNotFound />
          }/>
        </Switch>
      </main>
      <footer data-cy='footer-container' className='footer-container'>
        <p data-cy='footer' className='footer'>Visit us at <a href="https://github.com/The-Readers-Collective">The Reader's Collective</a></p>
      </footer>
    </div>

  )
}

export default App

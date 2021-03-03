import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Edit from './Pages/Edit';
import Create from './Pages/Create';
import Show from './Pages/Show';
import App from './Pages/App';


ReactDOM.render(

  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/create' component={Create} />
      <Route path='/show/:id' component={Show} />
    </div>
</Router>,
  
  
 document.getElementById('root'));



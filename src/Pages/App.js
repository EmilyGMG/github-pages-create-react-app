import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import './style.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { prioridade, title, description, date } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        prioridade,
        title,
        description,
        date,
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Lista de Problemas
            </h3>
          </div>
          <div class="panel-body">
            <h4><button class="btn btn-secondary"><Link  to="/create">Adicionar</Link></button></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Prioridade</th>
                  <th>Nome do Problema</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td style={{ backgroundColor: `${board.prioridade}` }}><Link to={`/show/${board.key} `}> +</Link></td>
                    <td>{board.title}</td>
                    <td>{board.date}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
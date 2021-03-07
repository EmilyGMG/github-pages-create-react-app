import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import firebase from '../Firebase';

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
      const { problem, title, description, date } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        problem,
        title,
        description,
        date
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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Lista de Problemas
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create" className="btn btn-secondary">Adicionar</Link></h4>
            <table className="table table-stripe">
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
                    <td style={{ backgroundColor: `${board.problem}` }}><Link to={`/show/${board.key}`} style={{ color: 'white', textTransform: 'capitalize', cursor: 'pointer', textShadow: '2px 2px black' }}>{board.problem}</Link></td>
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

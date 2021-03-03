import React, { Component } from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4>Descrição</h4>
            {/* <h3 class="panel-title">
              {this.state.board.title}
            </h3> */}
          </div>
          <div class="panel-body">
          <h4><Link to="/" class="btn btn-secondary">←</Link></h4>
            <dl>
              <dt>Nome do Problema</dt>
              <dd>{this.state.board.title}</dd>
              <dt>Descrição</dt>
              <dd>{this.state.board.description}</dd>
              <dt>Data</dt>
              <dd>{this.state.board.date}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
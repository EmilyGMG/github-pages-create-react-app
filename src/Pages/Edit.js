import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      problem: '',
      title: '',
      description: '',
      date: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          problem: board.problem,
          title: board.title,
          description: board.description,
          date: board.date
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { problem, title, description, date } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      problem,
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        key: '',
        problem: '',
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/show/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-secondary">←</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="problem">Problema</label>
                <br />
                <select name="problem" value={this.state.problem} onChange={this.onChange} id="problem" style={{ color: '#fff0', width: '100%' }}>
                  <option value="#fff0" style={{ background: '#fff0' }}>+</option>
                  <option value="green" style={{ background: 'green' }}>Verde</option>
                  <option value="yellow" style={{ background: 'yellow' }}>Amarelo</option>
                  <option value="red" style={{ background: 'red' }}>Vermelho</option>
                  <option value="purple" style={{ background: 'purple' }}>Roxo</option>
                </select>
              </div>
              <div class="form-group">
                <label for="title">Nome</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Nome" />
              </div>
              <div class="form-group">
                <label for="description">Descrição</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Descrição" />
              </div>

              <div class="form-group">
                <label for="date">Data</label>
                <input type="text" class="form-control" name="date" value={this.state.date} onChange={this.onChange} placeholder="Data" />
              </div>
              <div class="col-md-4 text-center mt-4">
                <button type="submit" class="btn btn-secondary">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';
import './style.css'
class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      problem: '',
      title: '',
      description: '',
      date: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { problem, title, description, date } = this.state;

    this.ref.add({
      problem,
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        problem: '',
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { problem, title, description, date } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Adicionar
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-secondary">←</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="problem">Problema</label>
                <br />
                <select name="problem" value={problem} onChange={this.onChange} id="problem" style={{ color: '#fff0', width: '100%' }}>
                  <option value="#fff0" style={{ background: '#fff0' }}>+</option>
                  <option value="green" style={{ background: 'green' }}>Verde</option>
                  <option value="yellow" style={{ background: 'yellow' }}>Amarelo</option>
                  <option value="red" style={{ background: 'red' }}>Vermelho</option>
                  <option value="purple" style={{ background: 'purple' }}>Roxo</option>
                </select>
              </div>
              <div className="form-group">
                <label for="title">Nome do Problema</label>
                <textArea className="form-control" name="title" onChange={this.onChange} placeholder="Nome" cols="80" rows="3">{title}</textArea>
              </div>
              <div className="form-group">
                <label for="description">Descrição</label>
                <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Descrição" />
              </div>
              <div className="form-group">
                <label for="date">Data</label>
                <input type="text" className="form-control" name="date" value={date} onChange={this.onChange} placeholder="Data" />
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

export default Create;

import React, { Component } from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';
import './style.css'


class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      prioridade: '',
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

    const { prioridade, description, title, date } = this.state;

    this.ref.add({
      prioridade,
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        prioridade: '',
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
    const { prioridade, description, title, date } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Adicionar
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-secondary">←</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="prioridade">Prioridade</label>
                 <br />
                  <select name="prioridade" value={prioridade} onChange={this.onChange} id="prioridade" style={{ color: '#fff0',width: '100%' }}>
                    <option value="#fff0" style={{background:'#fff0'}}>+</option> 
                    <option value="green" style={{background:'green'}}>Verde</option>
                    <option value="yellow" style={{background:'yellow'}}>Amarelo</option>
                    <option value="red" style={{background:'red'}}>Vermelho</option>
                    <option value="purple" style={{background:'purple'}}>Roxo</option>
                  </select>
                
              </div>
              <div class="form-group">
                <label for="title">Título</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} />
              </div>
              <div class="form-group">
                <label for="description">Descrição</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Descrição" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="date">Data</label>
                <input type="text" class="form-control" name="date" value={date} onChange={this.onChange} placeholder="00/00" />
              </div>
              <div class="col-md-4 text-center mt-4"> 
                <button  type="submit" class="btn btn-secondary">Pronto</button> 
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
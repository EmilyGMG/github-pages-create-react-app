import React, { Component } from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      prioridade: '',
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
          prioridade: board.prioridade,
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
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { prioridade, title, description, date } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      prioridade,
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        key: '',
        prioridade: '',
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
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
          <h4><Link to="/" class="btn btn-secondary">←</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="prioridade">Prioridade</label>
                 <br />
                  <select name="prioridade" value={this.state.prioridade} onChange={this.onChange} id="prioridade" style={{ color: '#fff0',width: '100%' }}>
                    <option value="#fff0" style={{background:'#fff0'}}>+</option> 
                    <option value="green" style={{background:'green'}}>+</option>
                    <option value="yellow" style={{background:'yellow'}}>+</option>
                    <option value="red" style={{background:'red'}}>+</option>
                    <option value="purple" style={{background:'purple'}}>+</option>
                  </select>
                
              </div>
              <div class="form-group">
                <label for="title">Nome do Problema</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="title" />
              </div>
              <div class="form-group">
                <label for="description">Descrição</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="date">Data</label>
                <input type="text" class="form-control" name="date" value={this.state.date} onChange={this.onChange} placeholder="date" />
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

export default Edit;
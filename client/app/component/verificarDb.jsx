import React,{Component} from 'react'

class VerificarDB extends React.Component {
  constructor(){
    super()
    this.verificar = this.verificar.bind(this)
  }

  verificar(){
    return fetch('/api/v1/verificarDb')
    .then(res => {
       return Promise.resolve(res);
    })
  }
}   

export default VerificarDB
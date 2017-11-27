import React, { Component } from 'react'

import { Card,Row } from 'antd';

export class PerfilUser extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>Perfil Usuario</h4>
          <p>Registro de Perfil Usuario</p> 
        </div> 
        <div style={{background:'#fff', margin:'20px 0', padding:20 }} >
        <Row>
          <Card style={{ width: 180 }} bodyStyle={{ padding: 0 ,borderRadius:'50%'}}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>Europe Street beat</h3>
              <p>www.instagram.com</p>
            </div>
          </Card>
        </Row>
      
        </div>
      </div>
    )
  }
}

export default PerfilUser

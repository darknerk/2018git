import React, { Component } from 'react'

import AuthService from '../../component/authservice/AuthService';
import {logo} from '../../images/index'

import {Spin, message} from 'antd';
import { Row, Col } from 'antd';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


export class LoginPrincipal extends Component {

  constructor(){
    super();
    this.state={
      username:'',
      password:'',
      message:'',
      tryingLogin: false,
    }
    this.Auth = new AuthService();
  }
  
  handleSubmit = (e) => {
    e.preventDefault(); 
  
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        const hide = message.loading('Verificando!', 1);

        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
              if(res.success==true){
                hide();
                const success=message.success("Message: "+res.message,0)
                setTimeout(success, 1000);
                this.props.history.replace('/panel');
              }else{
                message.error("Message: "+res.message)
              }
            })
            .catch(err =>{
                hide();
                message.error('Autenticacion Incorrecta!');
            })
      }
    });
  }

  componentWillMount=()=>{
    if(this.Auth.loggedIn())
        this.props.history.replace('/panel');
  
  }
  handleChange= (e)=>{
    this.setState({
        [e.target.name]: e.target.value
      }
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.tryingLogin) {
      return <div className="center-div"><Spin spinning={true} size="large"/></div>;
    }

    return ( 
      <div id="login">
        <Row>  
          <Col xs={{ span: 0}} sm={{span: 13}} md={{span: 15}} lg={{ span: 16}}>
            <div className="login-style">
              <div className="pic-image">
                <div className="image"></div> 
                <div className="bg-caption pull-bottom">
                <Row justify="center"> 
                  <h2>
                    SISTEMA DE INTEGRADO PARA GESTION  Y EFICIENCIA ADMINISTRATIVA
                    <br/>
                    SIGEA
                  </h2>
                  <p>
                    Imagen Tomada por Top Design Gobierno Regional de Piura.
                    <br/>
                    © 2017-2018 Oti.
                  </p>
                </Row>
                  
                </div>  
              </div>

            </div>
          </Col>
          <Col xs={{ span: 24}} sm={{span: 11}} md={{span: 9}} lg={{ span: 8}}>
          
            <div className="login-container">
              <div className="text-logo">
                <img src={logo} style={{width:'60px',paddingTop:'10px'}} />  
                GOBIERNO REGIONAL DE PIURA
              </div>
              <div className="text-session">
                Inicie Session en su cuenta
              </div>
              <div className="text-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Porfavor ingrese usuario!' }],
                      })(
                        <Input size="large"  style={{ fontSize: 17 }} name="username" onChange={this.handleChange} placeholder=" Ingrese usuario" />
                     
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Porfavor ingrese password!' }],
                      })(
                        <Input size="large" style={{ fontSize: 17 }} type="password" name="password" onChange={this.handleChange} placeholder=" Ingrese password" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Row>
                        <Col span={10} ><Checkbox style={{fontSize:'16px'}}>Recuérdame</Checkbox> </Col>
                        <Col span={14} > <div style={{textAlign:'right',fontSize:'16px'}} > <a href="#">Recupere su password!</a> </div>  </Col>
                      </Row> 
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        Acceder
                      </Button>

                    </FormItem>
                  </Form>
              </div>

              <div className="text-footer">
                Si presenta un error, falla, bug. Comunicarse al correo hnunura@regionpiura.gob.pe 
              </div>
            </div>

          </Col>
        </Row>
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(LoginPrincipal);

export default WrappedNormalLoginForm

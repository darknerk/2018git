import React,{Component} from 'react'
import {Link,NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {logo} from '../../images/index'
import AuthService from '../../component/authservice/AuthService';

import {Spin, message} from 'antd';
import { Layout, Menu, Row, Col,Button,Avatar,Card} from 'antd';
import { Form, Icon, Input, Checkbox,Styles } from 'antd';

const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;


class Inicio extends React.Component {
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
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

  render() {
    const { getFieldDecorator } = this.props.form
    
    if (this.state.tryingLogin) {
      return <div className="center-div"><Spin spinning={true} size="large"/></div>;
    }

    return (<div> 
   
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', width: '100%', margin:'0' }}>
            <img src={logo} style={{width:'50px',paddingTop:'10px'}} />  
            <span style={{padding:'10px'}}>Gobierno Regional de Piura</span>
        </Header> 
        <Content >
          <Row type="flex" justify="center" align="top">
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Card title="Login" bordered={false} style={{ width: 300,textAlign:'center' }}>
                  <Form onSubmit={this.handleSubmit} className="login-form">
                  
                    <FormItem>
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Ingrese Usuario!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} name="username" onChange={this.handleChange} placeholder="Username" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Ingrse Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} name="password" type="password" onChange={this.handleChange} placeholder="Password" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                      </Button>

                    </FormItem>
                  </Form>
              </Card>
            </div>
          </Row>
          <Row>
          
          </Row>

        </Content>

      </Layout>

      

      </div> 
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Inicio);


export default WrappedNormalLoginForm;
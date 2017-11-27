import React,{Component} from 'react'
import { Switch, Route,Link,NavLink } from 'react-router-dom'
import Responsive from 'react-responsive';
import {logo} from '../../images/index.js'
import AuthService from '../../component/authservice/AuthService';
import VerificarAuth from '../../component/authservice/VerificarAuth'

const Auth = new AuthService();

//Importar Pages
import PanelIndex from '../../pages/panelindex/panelindex'
import RegistroUser from '../../pages/registroUser/RegistroUser'
import PerfilUser from '../../pages/perfiluser/PerfilUser'

import {Avatar,Card} from 'antd'
import {Row, Col, Breadcrumb} from 'antd'
import { Layout, Menu, Icon, Button, Dropdown } from 'antd';

const { Header, Content, Footer, Sider, Styles } = Layout;
const SubMenu = Menu.SubMenu;

const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
const Tablet = ({ children }) => <Responsive minWidth={768} maxWidth={992} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;


class MenuSider extends Component {
  render() { 
    return (
      <div>
        <div className="logo" />
        <Menu 
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme={this.props.ThemeProps}
          >
          <Menu.Item key="1">
            <NavLink to='/panel/'>
              <Icon type="pie-chart" />
              <span> Dashboard </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to='/panel/registroUser'> 
              <Icon type="desktop" />
              <span>Prueba Registro</span> 
            </NavLink>
            
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="3">Option 5</Menu.Item>
            <Menu.Item key="4">Option 6</Menu.Item>
            <Menu.Item key="5">Option 7</Menu.Item>
            <Menu.Item key="6">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="7">Option 9</Menu.Item>
            <Menu.Item key="8">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="9">Option 11</Menu.Item>
              <Menu.Item key="10">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

class MenuUser extends Component{
  state = {
    current: 'mail'
  }
  render(){
    return(
      <Menu>
        <Menu.Item key="0">
          <Link to='/panel/perfilUser'>Profile</Link>
        </Menu.Item>
      </Menu>
    )
  }
}



class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuHide:false,
      siderHide:true
    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }); 
  }

  handleLogout= ()=>{
    Auth.logout()
    this.props.history.replace('/');
  }

  render(){
    return(
        <Layout style={{minHeight:'100vh'}} >
          { //collapsed={this.state.collapsed}  breakpoint="sm" collapsedWidth={0}  
          }

          <Sider collapsed={this.state.collapsed} trigger={null} style={{background:'#fff'}} >
            <Row style={{padding:'15px',textAlign:'center' }}>
                
                <div>
                  <img alt="example" width="60%" src={logo} />
                </div> 
                {
                  this.state.collapsed ? 
                  null : <div style={{fontSize:12, color: '#8D8D8C'}} >
                    <h4>Gobierno Regional de Piura</h4>
                    <p>Sistema integrado para la Gestion y Eficiencia Administrativa</p>
                  </div>
                }
                
      

            </Row>
            
            <MenuSider ThemeProps="light" ></MenuSider>
          </Sider>

          <Layout > 
            <header style={{background:'#fff', padding:5, borderBottom:'1px solid #e9e9e9'}}>
              <Row>
                <Col span={8}>
                  <Default>
                    <Button  onClick={this.toggleCollapsed} >
                      <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} /> 
                    </Button>
                  </Default>
                  <Mobile>
                    <Dropdown overlay={<MenuSider ThemeProps="light"/>} trigger={['click']} placement="bottomLeft">
                      <Button size="large" >
                        <Icon type='menu-unfold'/>  
                      </Button>
                    </Dropdown>
                  </Mobile>
                </Col>
                <Col span={8}  style={{ textAlign:'center'}}>
                  <Mobile>
                    <Avatar src={logo} />
                  </Mobile> 
                </Col>
                <Col span={8}  style={{ textAlign:'right'}}>
      
                  <Dropdown overlay={<MenuUser buttonLogoutProps="dffddfgdfg"/>} placement="bottomRight">
                      <Link className="ant-dropdown-link" to="#">
                        <Icon type="user" /> {this.props.user.username}
                      </Link>
                    
                  </Dropdown>
                  
                  <Button type="primary" onClick={this.handleLogout} style={{marginBottom:16}} >
                    Sign out
                  </Button>    
                </Col>
              </Row>
            </header>
             
            <Content>
              <Row style={{ margin: '24px', border:'1px sold red', minHeight: 360 }}>

        
                <Switch>
                  <Route exact path='/panel/' component={VerificarAuth(PanelIndex)} />
                  <Route path='/panel/registroUser' component={VerificarAuth(RegistroUser)} />
                  <Route path='/panel/perfilUser' component={VerificarAuth(PerfilUser)} />
                </Switch>

              </Row>    
            </Content> 
            <Footer style={{textAlign:'center'}} >
                <p>
                Copyright. Todos los derechos reservados.
                Desarrollo Web - OTI - Gobierno Regional de Piura
                </p> 
            </Footer>
          </Layout>
        </Layout>
    ) 
  }
}

export default Panel
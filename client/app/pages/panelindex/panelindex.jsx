import React, { Component } from 'react'
import { Table, Button, Icon, message, Input, Modal,notification,Row,Col } from 'antd';

//importar Components
import TableComponent from '../../component/table/table'
import FormModal from '../../component/modal/modal'

const ButtonGroup = Button.Group
const confirmModal = Modal.confirm

//columns 
const columns=[
      {
        title:'Usuario',
        columnKey:'username',
        modal:{
          type:'text'
        }
      },
      {
        title:'Nombres',
        columnKey:'nombres',
        modal:{
          type:'text'
        }
      },
      {
        title:'Apellidos',
        columnKey:'apellidos',
        modal:{
          type:'text'
        }
      },
      {
        title:'Email',
        columnKey:'email',
        modal:{
          type:'password'
        }
      },
      {
        title:'Hostname',
        columnKey:'hostname',
        modal:{
          type:'text'
        }
      },
      {
        title:'Estado',
        columnKey:'estado',
        modal:{
          type:'text'
        }
      }
    ]


export class PanelIndex extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      data: [],
      selectedRowKeys: [],
      sortedInfo: null,
      loading: false,

      showModal: false,
      formValues:{},
      modalTitle:'Agregar',
      modalRowType:'add'
    }
  }

  //TABLE - Eventos de Filtro y sorter (ORDERNAR MAYOR O MENOR)
  handleChangeTable = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  }

  //MODAL - AGREGAR - MOSTRAR PANEL
  agregarRow =()=>{
    this.setState({
      showModal: true,
      modalRowType:'add',
      modalTitle:'Agregar',
    });
  }
  //MODAL - EDITAR - MOSTRAR PANEL
  editarRow = ()=>{
    let selectedRowKeys=this.state.selectedRowKeys
    if(selectedRowKeys.length > 1){
      notification.warning({
        message:'Error!',
        description:'No se puede Modificar mas de 1 Filas!'
      })
    }else{
      this.setState({
        showModal: true,
        modalRowType:'edit',
        modalTitle:'Editar',
      });
    }   
  }

  //Cerrar Model
  cancelFormModal = () => {
    this.setState({
      showModal: false,
      formValues:{} ,
    })
  }

  submitModalFrm=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    alert("presiono aceptas")
  }

  //Antes de Carga DidMount
  componentDidMount=()=> {

    this.setState({ loading: true });
    
    fetch('/api/v1/user/all',{
      method:'GET',
      headers: {
        'Authorization': this.props.getToken
      }
    })
    .then(response => response.json())
    .then(data => 
      this.setState({
        loading: false,
        data: data
      })
    )
    .catch(error => message.error("Message: "+error));

  }

  render() {
    //tablet
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    let {selectedRowKeys,selectedRows} =this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys:selectedRowKeys,
          selectedRows:selectedRows
        })
      }
    };
    //fin table

    return (
      <div>
        <div>
          <h4>Registro Prueba</h4>
          <p>Registracion de Datos Usuarios</p> 
        </div> 
        <div style={{background:'#fff', margin:'20px 0', padding:20}}>

          <Row>
            <Col span={12}>
              <div style={{ margin: '10px 0' }}>
                  <ButtonGroup size="small">
                    <Button type="primary" onClick={this.agregarRow}>
                      <Icon type="plus-circle-o" />
                      Agregar
                    </Button>
                    <Button type="primary" disabled={selectedRowKeys < 1} onClick={this.editarRow}>
                      <Icon type="edit" />
                      Modificar
                    </Button>
                    <Button type="primary" disabled={selectedRowKeys < 1} onClick={this.eliminarRow}>
                      <Icon type="delete" />
                      Eliminar
                    </Button>
                  </ButtonGroup> 
              </div>
            </Col>
            <Col span={12} style={{textAlign:'right'}}>
              
              <Button.Group size="large">
                <Button onClick={() => {  window.open('/api/v2/jsReport/user?shortid=SyIH7rdnW')}}>
                  Report PDF
                </Button>
                <Button onClick={() => {  window.open('/api/v2/jsReport/user?shortid=H17Y3w_nZ') }}>
                  Report EXCEL
                </Button>
                <Button onClick={() => { window.open('/api/v2/jsReport/render?shortid=SyIH7rdnW') } } >
                  Report PDF Multi Pages
                </Button> 
              </Button.Group>
    
            </Col>
          </Row>
        

          <TableComponent dataRourceProps={this.state.data} 
                          columnsKeyProps={columns} 
                          rowKeyProps="username" 
                          loadingProps={this.state.loading} 
                          handleChangeProps={this.handleChangeTable} 
                          rowSelectionProps={rowSelection} 
                          sortedInfoProps={sortedInfo}
                          />
 
          <FormModal 
              formModalTitle={this.state.modalTitle}
              typeModal={this.state.modalRowType}
              showFormModal={this.state.showModal} 
              cancelFormModal={this.cancelFormModal}
                
              getTokenProps= {this.props.getToken}
              formColumnsProps={columns}
              formDataProps={selectedRows}
              
            />
 
        </div>
      </div>
      
    )
  }
}

export default PanelIndex

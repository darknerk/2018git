import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button, Icon, message, Input, Modal,notification, Select } from 'antd';

import RegistroFormModa from './modalRegistro'

const { Column } = Table;
const Search = Input.Search
const ButtonGroup = Button.Group
const confirmModal = Modal.confirm
const Option = Select.Option;


var pruebaa=[]

export class RegistroUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectedRowKeys: [],
      pagination: {},
      loading: false,
      sortedInfo: null,
      count:0,
      search:null,
      
      searchText:'',
      filtered: false,

      showModal: false,
      modalRowType:'add',
      modalTitle:'Agregar',
      formConfigs: [],

      selectedRowKeys:'',
      selectedRows:'',

      dataEditarRow:[],
      dataEnumRow:[]
    }
    this.eliminarRow = this.eliminarRow.bind(this)
  }
  //Eventos de Filtro y sorter
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  }

  //Antes de Carga DidMount
  componentDidMount=()=> {
    this.setState({ loading: true });
    //Obtener datos para la tabla
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

  //Obtener EnumApi
  getEnumApi=()=>{
    return fetch('/api/v1/models/enum',{headers: {'Authorization': this.props.getToken}})
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch(error=>{ return error.message} )
  }

  //MODAL - AGREGAR - MOSTRAR PANEL
  agregarRow = (e) => {
    e.preventDefault();
    this.setState({
      showModal: true,
      modalRowType:'add',
      modalTitle:'Agregar',
    })
    console.log("AGREGARROW: "+this.state.showModal)
  }

  //MODAL - EDITAR - MOSTRAR PANEL
  editarRow = (e)=>{
    e.preventDefault();
    let selectedRowKeys=this.state.selectedRowKeys
    if(selectedRowKeys.length > 1){
      notification.warning({
        message:'Error!',
        description:'No se puede Modificar mas de 1 Filas!'
      })
    }else{
      fetch('/api/v1/user/all/'+selectedRowKeys,{headers: {'Authorization': this.props.getToken}})
        .then(response=>response.json())
        .then(data => this.setState({ 
          dataEditarRow:data,
          showModal: true,
          modalRowType:'edit',
          modalTitle:'Editar' 
        })) 
        .catch(error=> console.log('Problemas con Fetch!: ' + error.message))
        
    }
  }

  //Eliminar base de datos Seleccionado
  eliminarRow = (e) =>{
    e.preventDefault();
    
    ///Verificar si no se a seleccionado
    const selectedRowKeys=this.state.selectedRowKeys
    const getToken= this.props.getToken
    
    confirmModal({
      title:'Eliminar Seleccionados',
      content: this.state.selectedRowKeys.length <=1 ? 'Desea Eliminar: '+selectedRowKeys  : 'Desea Eliminar los usuarios: '+selectedRowKeys,
      okText: 'Yes',
      okType: 'danger', 
      cancelText: 'No',
      onOk() {
        
        const hideMsg = message.loading('Eliminando...', 0);

        fetch('/api/v1/user/delete/'+selectedRowKeys,{
          method:'delete',
          headers:{
            'Authorization':getToken
          }
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.status){
              notification.success({
                message:'Exito!',
                description:data.message
              })
           
              //this.props.history.replace(this.props.location.pathname)
              
            }else{
              notification.error({
                message:'Error!',
                description:data.message
              })
            }
          hideMsg()
        })

      }
    })
  }

  //MODAL - CERRRAR 
  cancelFormModal = () => {
    this.setState({
      showModal: false,
    })
  
  }

  //BUSQUEDA SEARCH
  onSearch = () => {
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    let {selectedRowKeys,selectedRows} =this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys:selectedRowKeys,
          selectedRows:selectedRows
        })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    const hasSelected = selectedRowKeys.length > 0;
  
    let { formConfigs,showModal }=this.state

    return (
      <div>
        <div>
          <h4>Registro Prueba</h4>
          <p>Registracion de Datos Usuarios</p> 
        </div> 
        <div style={{background:'#fff', margin:'20px 0', padding:20}} >
       
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

          <Input.Search
            placeholder="Busqueda"
            onChange={ (e)=> this.setState({ searchText: e.target.value })}
            onPressEnter={this.onSearch}
          />
     
          <Table dataSource={this.state.data} pagination={this.state.pagination}
            rowSelection={rowSelection}
            rowKey="username"
            locale={{filterConfirm: 'Ok',filterReset: 'Reset',emptyText: 'No Data'}}
            onChange={this.handleChange}
            loading={this.state.loading}>
            <Column title="Usuario"   dataIndex="username"  key="username"  filters={[{text: 'admin', value: 'admin',}, {text: 'prueba',value: 'prueba'}]} onFilter= { (value, record) => record.username.indexOf(value) === 0}  sorter={ this.state.data.length>0 ? (a,b)=> a.username.length - b.username.length : null }  sortOrder={sortedInfo.columnKey=='username' && sortedInfo.order}/>
            <Column title="Nombres"   dataIndex="nombres"   key="nombres"   sorter={ this.state.data.length>0 ?(a,b)=>a.nombres.length - b.nombres.length : null}     sortOrder={sortedInfo.columnKey=='nombres' && sortedInfo.order} />
            <Column title="Apellidos" dataIndex="apellidos" key="apellidos" sorter={ this.state.data.length>0 ?(a,b)=>a.apellidos.length - b.apellidos.length :null } sortOrder={sortedInfo.columnKey=='apellidos' && sortedInfo.order}/>
            <Column title="Email"     dataIndex="email"     key="email"     />
            <Column title="Hostname"  dataIndex="hostname"  key="hostame"   />
            <Column title="Activo"    dataIndex="estado"    key="estado"    sorter={ this.state.data.length>0 ?(a,b)=>a.status.length - b.status.length :null}      sortOrder={sortedInfo.columnKey=='status' && sortedInfo.order}/>
          </Table>
          
          <RegistroFormModa
            formModalTitle={this.state.modalTitle}
            typeModal={this.state.modalRowType}
            showFormModal={this.state.showModal?true: false} 
            cancelFormModal={this.cancelFormModal}
            getTokenProps= {this.props.getToken}
            dataEditarRowProps={this.state.dataEditarRow} //Enviar Datos segun el Seleccionado Row
            dataEnumRowProps={this.state.dataEnumRow}     //Envia Enumeracion de Consultas Modelos para Combobox
          />
        
        </div> 
          
      </div>
    )
  }
}

export default withRouter(RegistroUser)

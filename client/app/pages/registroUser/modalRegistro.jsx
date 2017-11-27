import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Modal, Form, Button,Input, Row, Select,notification } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class FormModal extends Component{
  constructor(props) {
    super(props); 
    this.state={
      token:this.props.getTokenProps,
      selectOption:'',
      showModal: false,
      confirmLoading: false,
    }
    this.submitModalFrm = this.submitModalFrm.bind(this)
  }

  submitModalFrm=(e)=>{
    e.preventDefault();
    
    this.props.form.rel
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        //AGREGAR
        if(this.props.typeModal=='add'){
           
          fetch('/api/v1/user/register',{
            method: 'POST',
            headers:{'Authorization':this.state.token,'Content-type':'application/vnd.api+json'},
            body:JSON.stringify(values)
          })
          .then(respuesta=>respuesta.json())
          .then(result=>{
            if(result.success){
              notification.success({
                duration:1,
                message:'Exito!',
                description:result.message
              })
              this.props.form.resetFields() 
              this.props.history.push(this.props.location.pathname)

            }else{
              notification.warning({
                duration:1,
                message:'Resultado!',
                description:result.message
              })
            }
          })
          .catch(error=> {
            notification.warning({
              message:'Error!',
              description:error
            })
          })
        }
        //EDITAR
        else{
     
          fetch('/api/v1/user/update/'+this.props.dataEditarRowProps.username,{
            method: 'PUT',
            headers:{'Authorization':this.state.token,'Content-type':'application/vnd.api+json'},
            body:JSON.stringify(values)
          })
          .then(respuesta=>respuesta.json())
          .then(result=>{
            if(result.success){
              notification.success({
                message:'Exito!',
                description:result.message
              })
              this.props.form.resetFields()
              this.props.history.push(this.props.location.pathname)
            }else{
              notification.warning({
                duration:1,
                message:'Resultado!',
                description:result.message
              })
            }
          })
          .catch(error=> {
            notification.warning({
              duration:1,
              message:'Error!',
              description:error
            })
          })
    
        }
      }
    });
  }
  
  //MODAL - CERRRAR 
  cancelFormModal = () => {
    handleModal()
    handleReset()
    //handleReset()
  }

  //MOSRAR MODAL
  handleModal=()=>{
  
    this.setState({
      showModal: true,
    })
  }

  //RESET 
  handleReset(e) {
    
    this.props.form.resetFields()
  }

  render(){
    const { getFieldDecorator } = this.props.form;
   
    return(
        <Modal
          title={this.props.formModalTitle}
          visible={  this.props.showFormModal} 
          onCancel={this.props.cancelFormModal}
          confirmLoading={this.state.confirmLoading}

          /*
          footer={[
            <Button key="back" size="large" onClick={this.props.cancelFormModal} onClick={this.handleReset}>Cancelar</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.submitModalFrm}>
              Submit
            </Button>,
          ]}
          */ 
          onOk={this.submitModalFrm}
          okText="Guardar"
          cancelText="Cancelar"

          >
         
          <Row justify="center">
            <Form layout='horizontal'  >
                  <FormItem
                    label='username'
                    {...formItemLayout}
                    hasFeedback
                    > 
                    {getFieldDecorator( 'username', {
                      rules: [{ required: true, message: 'Ingrese Usuario!' }],
                      initialValue: this.props.typeModal=='add'? '' : this.props.dataEditarRowProps.username
                    },)(
                      <Input />
                    )}
                  </FormItem>

                  <FormItem
                    label='password'
                    {...formItemLayout}
                    hasFeedback
                    > 
                    {getFieldDecorator( 'password', {
                      rules: [{ required: true, message: 'Ingrese Password!' }],
                      initialValue: ''
                    },)(
                      <Input type="password"/>
                    )}
                  </FormItem>
                  <FormItem
                    label='nombres'
                    {...formItemLayout}
                    hasFeedback
                    > 
                    {getFieldDecorator( 'nombres', {
                      rules: [{ required: true, message: 'Ingrese Nombres!' }],
                      initialValue: this.props.typeModal=='add'? '' : this.props.dataEditarRowProps.nombres
                    },)(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    label='apellidos'
                    {...formItemLayout}
                    hasFeedback
                    > 
                    {getFieldDecorator( 'apellidos', {
                      rules: [{ required: true, message: 'Ingrese Apellidos' }],
                      initialValue: this.props.typeModal=='add'? '' : this.props.dataEditarRowProps.apellidos
                    },)(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    label='email'
                    {...formItemLayout}
                    hasFeedback
                    > 
                    {getFieldDecorator( 'email', {
                      rules: [{type: 'email',required: true, message: 'Email no Valido!',}],
                      initialValue: this.props.typeModal=='add'? '' : this.props.dataEditarRowProps.email
                    },)(
                      <Input />
                    )}
                  </FormItem>
        
                  <FormItem
                    label="estado"
                    {...formItemLayout}
                    >
                    {getFieldDecorator('estado', {
                      initialValue: this.props.typeModal=='add'? 'activo' : this.props.dataEditarRowProps.estado
                      }, { 
                      rules: [{ required: true, message: 'Seleccione Estado!' }],
                    })(
                      
                      <Select style={{ width: 120 }}>
                        <Option value="activo" >activo</Option>
                        <Option value="inactivo" >inactivo</Option>
                    </Select>
                    )}
                  </FormItem>
            </Form>
          </Row>                    
        </Modal> 
    )
  }
}


const RegistroFormModa = Form.create()(withRouter(FormModal))
export default RegistroFormModa
import React, { Component } from 'react';
import { Modal, Form, Button,Input } from 'antd';

const FormItem = Form.Item;

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
      Columns:[],
      Dada:[]
    }

  }

  componentDidMount(){
    this.setState({
      Columns:this.props.formColumnsProps,
    })
  }

  submitModalFrm=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  
  render(){
    const { getFieldDecorator} = this.props.form;
    return(
        <Modal
          title={this.props.formModalTitle}
          visible={this.props.showFormModal}
          onCancel={this.props.cancelFormModal}
          footer={[
            <Button key="back" size="large" onClick={this.props.cancelFormModal}>Cancelar</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.submitModalFrm}>
              Submit
            </Button>,
          ]}
          >
          
          <Form layout='horizontal' onSubmit={this.submitModalFrm}>
            {this.state.Columns.map(item=>{
              return (
                <FormItem
                    key={item.columnKey}
                    label={item.columnKey}
                    {...formItemLayout}
                    hasFeedback
                    > 
                    {getFieldDecorator( item.columnKey, {
                      rules: [{ required: true, message: 'Ingrese Usuario!' }],
                      initialValue: this.props.typeModal=='add'? '' : this.props.formDataProps[0].username
                    },)(
                      <Input   />
                    )}
                </FormItem>
              )
              
            })}
          </Form>

        </Modal>
    )
  }
}


const AppFormModa = Form.create()(FormModal);
export default AppFormModa
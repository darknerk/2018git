import React, { Component } from 'react'

import { Table, Button, Icon, message, Input,notification } from 'antd';

const { Column } = Table;

export class TableComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRowKeys: [],
      pagination: {},
      loading: false,
      sortedInfo: null,
      count:0,
      search:null,
    }
  }
  //Eventos de Filtro y sorter
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  }
  
  //Seleccionar  Fila Casilla Checkbox
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    
    const hasSelected = selectedRowKeys.length > 0;


    

    return (
      <div>
        <Table dataSource={this.props.dataRourceProps} pagination={this.props.paginationProps}
            rowSelection={this.props.rowSelectionProps}
            rowKey={this.props.rowKeyProps}
            locale={{filterConfirm: 'Ok',filterReset: 'Reset',emptyText: 'No Data'}}
            onChange={this.props.handleChangeProps}
            loading={this.props.loadingProps}>

            {this.props.columnsKeyProps.map( key=> 
              <Column title={key.title} dataIndex={key.columnKey}  key={key.columnKey}  sorter={ this.props.dataRourceProps.length>0 ? (a,b)=>a.nombres.length - b.nombres.length : null}    sortOrder={this.props.sortedInfoProps.columnKey==key.columnKey &&this.props.sortedInfoProps.order} />
            )}            
          </Table>
      </div>
    )
  }
}



export default TableComponent

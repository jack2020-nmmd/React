import React,{Component} from 'react'
import { Card, Button, Select, Input, Table} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
const { Option } = Select;
export default class Product extends Component{
    handleChange = (value) => {
        console.log(`selected ${value}`);
      }
    render(){
        const dataSource = [
            {
              key: '1',
              name: '手机',
              desc: '国产机',
              price: '999',
              status:'在售',
              opera:'',
            },
            {
                key: '2',
                name: '电脑',
                desc: '国产机',
                price: '2999',
                status:'在售',
                opera:'',
            },
          ];
          
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              align:'center',
              key: 'price',
              render:(price) => {return "￥"+price}//如果有dataIndex那么值就是Dataindex，否则就是全部,如果想写自己的东西，render必须加
            },
            {
                title: '状态',
                dataIndex: 'status',
                align:'center',
                key: 'status',
                render:(status) => {
                    return (
                        <div>
                            <Button type="primary">下架</Button>
                            <br/>
                            <span>{status}</span>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'opera',
                align:'center',
                key: 'opera',
                render:(opera) => {
                    return (
                        <div>
                            <Button type="link">修改</Button>
                            <br/>
                            <Button type="link">详情</Button>
                        </div>
                    )
                }
            },
          ];
        return (
            <Card 
                title={
                    <div>
                        <Select defaultValue="name"  onChange={this.handleChange}>
                            <Option value="name">按名称搜索</Option>
                            <Option value="desc">按描述搜索</Option>
                        </Select>
                        <Input 
                            placeholder="请输入搜索关键字" 
                            style={{width:'20%', margin:'0 10px'}}
                            allowClear
                        />
                        <Button type="primary" style={{borderRadius:'5px'}}>搜索</Button>
                    </div>
                } 
                extra={<Button type="primary">添加商品<PlusCircleFilled/></Button>}
            >
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered
                />
            </Card>
        )
    }
}
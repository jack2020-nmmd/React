import React,{Component, Fragment} from 'react'
import {Card, Button, Table, message} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import {reqCategoryList} from '../../api'
import {PAGE_SIZE} from '../../config'

export default class Category extends Component{
    state = {
        categoryList:[],//商品分类列表
    }
    getCategoryList = async() => {
        let result = await reqCategoryList()
        let {status, data, msg} = result
        /*data = data.map(item => {
            item.key = item._id
            return item
        })*/
        if (status === 0) {
            return this.setState({categoryList:data})
        }else{
            message.error(msg, 1)
        }
    }
    componentDidMount(){
        //一上来就获取商品分类列表
        this.getCategoryList()
    }
    render(){
        const dataSource = this.state.categoryList
          
          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              //dataIndex: 'abc',
              key: 'age',
              render:(a) => {return <Button type="link">修改分类</Button>},
              width:'25%',
              align:'center'
            },
          ];
        return (
                <Card
                    extra={<Button type="primary">添加<PlusCircleFilled/></Button>}
                >
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered={true} 
                        rowKey="_id"
                        pagination={{pageSize:PAGE_SIZE}}
                    />;
                </Card>
        )
    }
}
import React,{Component} from 'react'
import { Card, Button, Select, Input, Table, message} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import {connect} from 'react-redux'
import {reqProductList, reqUpdateProductStatus, reqSearchProduct} from '../../api'
import {PAGE_SIZE} from '../../config'
import {createSaveProductAction} from '../../redux/action_creators/product_action'

const { Option } = Select;
class Product extends Component{
    state = {
        productList:[],
        total:'',
        current:1,
        keyWord:'',
        searchType:'productName'
    }

    componentDidMount = () => {
        this.getProductList()
    }

    getProductList = async(num=1) => {
        let result
        if (this.isSearch) {
            const {searchType, keyWord} = this.state
            result = await reqSearchProduct(num, PAGE_SIZE, searchType, keyWord)
        }else{
            result = await reqProductList(num, PAGE_SIZE)
        }
        const {status, data} = result
        if (status === 0) {
            this.setState({
                productList:data.list,//商品分页列表信息
                total:data.total,//总条数
                current:data.pageNum})
        //把获取的商品列表存入redux中
        
        }
        //把获取的商品列表存入redux中
        this.props.saveProductAction(data.list)
    }
 //更新商品状态
    updateProStatus = async(item) => {
        let productList = [...this.state.productList]//状态里获取数组用这样，断开引用关系，不然可能有麻烦
        let {_id, status} = item
        if (status === 1) {
            status = 2
        }else{
            status = 1
        }
        let result = await reqUpdateProductStatus({_id, status})
        if (result.status === 0) {
            message.success('更新成功')
            productList =  productList.map((item) => {
                if(item._id === _id){
                    item.status = status
                }
                return item
            })
            this.setState({productList})
        }else{message.error('更新失败')}

    }

    search = async() => {
        this.isSearch = true
        this.getProductList()       
    }
    render(){
        const dataSource = this.state.productList
        const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
              width:'18%',
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
              width:'9%',
              render:(price) => {return "￥"+price}//如果有dataIndex那么值就是Dataindex，否则就是全部,如果想写自己的东西，render必须加
            },
            {
                title: '状态',
                //dataIndex: 'status',
                align:'center',
                key: 'status',
              width:'9%',
                render:(item) => {
                    return (
                        <div>
                            <Button 
                                type={item.status === 1 ? 'danger' : 'primary'}
                                onClick={() => {this.updateProStatus(item)}}
                            >
                                    {item.status === 1? '下架' : '上架'}
                            </Button>
                            <br/>
                            <span>{item.status === 1 ? '在售' : '已停售'}</span>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                //dataIndex: 'opera',
                align:'center',
                key: 'opera',
              width:'9%',
                render:(item) => {
                    return (
                        <div>
                            <Button type="link" onClick = {()=>{this.props.history.push('/admin/prod_about/product/add_update/5555')}}>修改</Button>
                            <br/>
                            <Button type="link" onClick = {()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button>
                        </div>
                    )
                }
            },
          ];
        return (
            <Card 
                title={
                    <div>
                        {/* //用受控组件方法来使用点击事件 */}
                        <Select defaultValue="productName"  onChange={(value) => {this.setState({searchType:value})}}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input 
                            placeholder="请输入搜索关键字" 
                            style={{width:'20%', margin:'0 10px'}}
                            allowClear
                            onChange={(event) => {this.setState({keyWord:event.target.value})}}
                        />
                        <Button type="primary" style={{borderRadius:'5px'}} onClick={this.search}>搜索</Button>
                    </div>
                } 
                extra={<Button type="primary" onClick = {()=>{this.props.history.push('/admin/prod_about/product/add_update')}}>添加商品<PlusCircleFilled/></Button>}
            >
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered
                    rowKey='_id'
                    pagination={{
                        total:this.state.total,
                        pageSize:PAGE_SIZE,
                        current:this.state.current,
                        onChange:this.getProductList
                    }}
                />
            </Card>
        )
    }
}

export default connect(
    state => ({/*productList:state.productList*/}),//这个状态是自己用才写的，自己存进去就不需要写了
    {
        saveProductAction:createSaveProductAction,
    }
  )(Product)
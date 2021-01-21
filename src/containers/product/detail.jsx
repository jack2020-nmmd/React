import React,{Component} from 'react'
import {Button, Card, List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import "./detail.less";
import {reqProdById, reqCategoryList} from '../../api'
const {Item} = List
class Detail extends Component{
    state = {
        categoryId:'',
        categoryName:'',
        desc:'',
        detail:'',
        imgs:[],
        name:'',
        price:'',
        loading:true,
    }
    getProdById = async(id) => {
        const result = await reqProdById(id)
        const {status, data, msg} = result
        if (status === 0) {
            this.categoryId = data.categoryId
            const {categoryId, desc, detail, imgs, name, price} = data
            this.setState({categoryId, desc, detail, imgs, name, price,loading:false})
        }
    }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        const {data, status, msg} = result
        if (status === 0) {
            let result = data.find((item) => {
                return item._id === this.categoryId
            })
            if (result) {
                this.setState({categoryName:result.name,loading:false})
            }
        }
    }
    componentDidMount(){
        const reduxProdList = this.props.productList
        const reduxCateList = this.props.categoryList
        if (reduxProdList.length) {
            const selectProduct = reduxProdList.find((item)=>{
                return item._id === this.props.match.params.id
            })
            if (selectProduct) {
                const {categoryId, desc, detail, imgs, name, price} = selectProduct
                this.categoryId = selectProduct.categoryId
                this.setState({categoryId, desc, detail, imgs, name, price})
                //this.setState({...selectProduct})三点运算符本来不能遍历对象和数组，但在react和babel环境中可以了
            }
        }else this.getProdById(this.props.match.params.id)
            
        if (reduxCateList.length) {
            const selectCategory = reduxCateList.find((item)=>{
                return item._id === this.categoryId
            })
            this.setState({categoryName:selectCategory.name,loading:false})
        }else{
            this.getCategoryList()
        }
    }
    render(){
        return (
            <Card title={
                <Button type='link' onClick={()=>{this.props.history.goBack()}} className='prod-bottom'><ArrowLeftOutlined/><span>商品详情</span></Button>
            }
            loading={this.state.loading}
            > 
                <List>
                    <Item className='item'>
                        <span className='prod-name'>商品名称: &nbsp; </span>
                        <span>{this.state.name}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品描述: &nbsp;</span>
                        <span>{this.state.desc}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品价格: &nbsp;</span>
                        <span>{this.state.price}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>所属分类: &nbsp;</span>
                        <span>{this.state.categoryName}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品图片: &nbsp;</span>
                        <span>{this.state.imgs.map((item, index) => {
                            return <img key={index} src={"/upload/"+item} alt="商品图片"/>
                        })}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品详情: &nbsp;</span>
                        <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}

export default connect(
    state => ({productList:state.productList,categoryList:state.categoryList}),//这个状态是自己用才写的，自己存进去就不需要写了
    {
        
    }
  )(Detail)
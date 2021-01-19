import React,{Component} from 'react'
import {Button, Card, List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import "./detail.less";
const {Item} = List
export default class Detail extends Component{
    render(){
        return (
            <Card title={
                <Button type='link' onClick={()=>{this.props.history.goBack()}} className='prod-bottom'><ArrowLeftOutlined/><span>商品详情</span></Button>
            }> 
                <List>
                    <Item className='item'>
                        <span className='prod-name'>商品名称: &nbsp; </span>
                        <span>{this.props.match.params.id}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品描述: &nbsp;</span>
                        <span>111</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品价格: &nbsp;</span>
                        <span>111</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>所属分类: &nbsp;</span>
                        <span>111</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-name'>商品图片: &nbsp;</span>
                        <span>111</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
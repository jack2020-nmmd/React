import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,Button,Form,Input,Select,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
const {Item} = Form
const {Option} = Select
class AddUpdate extends Component{
    render(){
        //const {getFieldDecorator} = this.props.form;
        //const {operaType} = this.state
        return (
            <Card 
            title={
                <div>
                <Button type="link" onClick={this.props.history.goBack}>
                    <ArrowLeftOutlined/>
                    <span>返回</span>
                </Button>
                {/* <span>{operaType==='update' ? '商品修改' : '商品添加'}</span> */}
                </div>
                }
            >
            <Form 
                onSubmit={this.handleSubmit}
                labelCol={{md:2}}
                wrapperCol={{md:7}}
            >
                <Item label="商品名称">
                    {
                        // getFieldDecorator('name', {
                        // initialValue:this.state.name || '',
                        // rules: [{required: true, message: '请输入商品名称' }],
                        // })(
                        <Input
                            placeholder="商品名称"
                        />
                        //)
                    }
                </Item>
                <Item label="商品描述">
                    {/* {getFieldDecorator('desc', {
                        initialValue:this.state.desc || '',
                        rules: [
                        { required: true, message: '请输入商品描述' },
                        ],
                    })(
                        <Input
                        placeholder="商品描述"
                        />
                    )} */}
                </Item>
                <Item label="商品价格">
                    {/* {getFieldDecorator('price', {
                        initialValue:this.state.price || '',
                        rules: [
                        { required: true, message: '请输入商品价格' },
                        ],
                    })(
                    <Input
                    placeholder="商品价格"
                    addonAfter="元"
                    prefix="￥"
                    type="number"
                    />
                )} */}
                </Item>
                <Item label="商品分类">
                    {/* {getFieldDecorator('categoryId', {
                        initialValue:this.state.categoryId || '',
                        rules: [
                        { required: true, message: '请选择一个分类' },
                        ],
                })(
                    <Select>
                    <Option value="">请选择分类</Option>
                    {
                        this.state.categoryList.map((item)=>{
                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                        })
                    }
                    </Select>
                )} */}
                </Item>
                <Item label="商品图片" wrapperCol={{md:12}}>
                    商品图片
                </Item>
                <Item label="商品详情" wrapperCol={{md:16}}>
                    富文本编辑器
                </Item>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form>
            </Card>
        )
    }
    }
export default connect(
    state => {},
    {}
)(AddUpdate)
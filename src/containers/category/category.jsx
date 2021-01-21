import React,{Component} from 'react'
import {Card, Button, Table, message, Modal, Form, Input} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import {connect} from 'react-redux'
import {createSaveCategoryAction} from '../../redux/action_creators/category_action'
import {reqCategoryList, reqAddCategory, reqUpdateCategory} from '../../api'
import {PAGE_SIZE} from '../../config'

class Category extends Component{
    inputRef = React.createRef()
    state = {
        categoryList:[],//商品分类列表
        visible:false,//控制弹窗的显示和隐藏
        operType:'',//操作类型？新增？修改
        isLoading:true,//是否处于加载中
        modalCurrentValue:"",//弹窗显示的值
        modalCurrentId:""//弹窗显示的值，用于数据回显
    }
    
    getCategoryList = async() => {
        let result = await reqCategoryList()
        this.setState({isLoading:false})
        let {status, data, msg} = result
        /*data = data.map(item => {
            item.key = item._id
            return item
        })*/
        if (status === 0) {
            this.setState({categoryList:data.reverse()})
            //把商品分类信息放入redux
            this.props.saveCategory(data)
        }else{
            message.error(msg, 1)
        }
    }
    componentDidMount(){
        //一上来就获取商品分类列表
        this.getCategoryList()
    }
//用于展示弹窗   
        showAdd = () => {
            this.setState({visible:true, operType:'add'});
        };
        showUpdate = (item) => {
            console.log(item);
            const {_id, name} = item
            this.setState({visible:true,
                operType:'update', 
                modalCurrentValue:name,
                modalCurrentId:_id
            });
          };
       
          toAdd = async(values) => {
            let result = await reqAddCategory(values)
            const {status, data, msg} = result
            if (status === 0) {
                message.success('新增商品成功')
                let categoryList = [...this.state.categoryList]
                categoryList.unshift(data)
                this.setState({categoryList})
                this.setState({visible:false});//隐藏表单
            }
            if (status === 1) message.error(msg, 1)
          }

          toUpdate = async(categoryObj) => {
            let result = await reqUpdateCategory(categoryObj)
            const {status, msg} = result
            if (status === 0) {
                message.success('更新成功')
                this.getCategoryList()
                this.setState({visible:false});//隐藏表单
            }
            if (status === 1) message.error(msg, 1)
        }
          
          handleOk = async() =>{
            const {operType} = this.state
            //获取input输入的内容
            let value = this.inputRef.current.getFieldValue('categoryName')
            if (!value) {
              message.warning('必须输入密码');
              return
            }
            
            if (operType === "add") this.toAdd(value)
            if (operType === "update") {
                const categoryId = this.state.modalCurrentId;
                const categoryName = value;
                const categoryObj = {categoryId, categoryName}
                this.toUpdate(categoryObj);
            }
          }


        handleCancel = () => {
            this.setState({visible:false});
        };
        
    render(){
        const dataSource = this.state.categoryList
        const {operType} = this.state
        const {Item} = Form
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
              render:(item) => {return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
              width:'25%',
              align:'center'
            },
          ];
        return (
            
            <div>
                <Card
                    extra={<Button type="primary" onClick={this.showAdd}>添加<PlusCircleFilled/></Button>}
                >
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered={true} 
                        rowKey="_id"
                        pagination={{pageSize:PAGE_SIZE, showQuickJumper:true}}
                        loading={this.state.isLoading}
                    />
                </Card>
                <Modal 
                    title={operType === "add" ? "新增分类" : "修改分类"} 
                    visible={this.state.visible} 
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel} 
                    onText="确定"
                    cancelText="取消"
                    destroyOnClose//每次关闭表单都清空
                    >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        ref={this.inputRef}
                    >
                        <Item
                            name="categoryName"
                            initialValue={operType === "add" ? "" : this.state.modalCurrentValue}
                            rules={[
                                { required: true, message: '分类名必须输入',}
                            ]}
                            
                            >
                            <Input placeholder="请输入分类名" />
                        </Item>
                    </Form>
                </Modal>
            </div>
              
        )
    }
}
export default connect(
    state => {},
    {saveCategory:createSaveCategoryAction}
)(Category)
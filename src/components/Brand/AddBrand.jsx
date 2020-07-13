
import React from 'react';  //导入react
import { Table, Form, Space, Button, Modal, Input, Upload } from "antd";
import { Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import axios from '../../utils/axios'
import wjapi from '../../api/index';

const { TextArea } = Input;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default class AddBrand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],//tupian
            addname: '', //添加的名称
            addbeizhu:'',//添加的备注
        }
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) =>
        this.setState(
            {
                fileList
            }, function () {
                console.log(this.state.fileList)
                this.state.fileList.map((item, index) => {
                    // console.log(item)
                    this.props.getAddimg(item)
                })

            });
    Addname(e) {
        this.setState({
            addname: e.target.value
        }, () => {
            // console.log(this.state.addname)
            this.props.getAddname(this.state.addname)
        })
    }
    Addbeizhu(e){
        this.setState({
            addbeizhu: e.target.value
        }, () => {
            // console.log(this.state.addbeizhu)
            this.props.getAddbeizhu(this.state.addbeizhu)
        })
    }
 
    render() {
        let upImg = wjapi.brand.upImg
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (

            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="品牌名称："
                            name="brandname"
                            rules={[{ required: true, message: '请输入品牌名称' }]}
                        >
                            <Input
                                onChange={this.Addname.bind(this)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="品牌备注："
                            name="beizhu"
                            rules={[{ required: true }]}
                        >
                            <TextArea
                                onChange={this.Addbeizhu.bind(this)}
                                rows={4}
                            />
                        </Form.Item>
                        <Form.Item
                            label="品牌logo："
                            name="logo"
                            rules={[{ required: true }]}>

                            <Row>
                                <Col span={24}>
                                    <Upload
                                        action={upImg}
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal
                                        visible={previewVisible}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={this.handleCancel}
                                    >
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }


}
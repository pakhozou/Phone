
import React from 'react';  //导入react
import { Table, Form, Space, Button, Modal, Input, Upload } from "antd";
import { Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],//tupian
            //上传的图片
            // shangchuanimg: []
            brandname: '',
            brandbeizhu: ''
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
                // console.log(this.state.fileList)
                this.state.fileList.map((item, index) => {
                    // console.log(index)
                    this.props.getDataimg(item)
                })

                // console.log(this.state.shangchuanimg.uid)
            });
    Brandname(e) {
        this.setState({
            brandname: e.target.value
        },()=>{
            this.props.getDataname(this.state.brandname)
        });
    }
    Brandbeizhu(e) {
        this.setState({
            brandbeizhu: e.target.value
        },()=>{
            this.props.getDatabeizhu(this.state.brandbeizhu)
        });
    }
    render() {
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

            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="品牌id"
                    name="brandid"
                >
                    <Input
                        placeholder={this.props.bianji.goodsBrand_id}
                        disabled='true'
                        // value={this.props.kong}
                    />
                </Form.Item>

                <Form.Item

                    label="品牌名称"
                    name="brandname"
                    rules={[{ required: true, message: '请输入品牌名称' }]}
                >
                    <Input
                        onChange={this.Brandname.bind(this)}
                        placeholder={this.props.bianji.goodsBrand_name}
                        value={this.props.kong}
                    />
                </Form.Item>
                <Form.Item
                    label="品牌logo："
                    name="logo"
                >
                    <img src={this.props.bianji.goodsBrand_logo} alt="" style={{ width: 200 }} />
                    <Row>
                        <Col span={24}>
                            <Upload
                                action="http://111.229.83.241:9601/user/file/upload"
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
                <Form.Item

                    label="品牌备注"
                    name="beizhu"
                    rules={[{ required: true, message: '请输入品牌备注' }]}
                >
                    <Input
                        onChange={this.Brandbeizhu.bind(this)}
                        placeholder={this.props.bianji.remarks}
                        value={this.props.kong}
                    />
                </Form.Item>
            </Form>
        );
    }

}

import { useState } from 'react';
import './App.css'
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Button, Upload, Form } from 'antd';

function App() {
  const [data, setData] = useState(null)
  const [messageApi, contextHolder] = message.useMessage();
  const success = (content) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };
  const error = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };
  const onclick = async () => {
    const formData = new FormData();
    formData.append('file', data);
    console.log('file ----------------------- \n', data)

    //http://3.25.201.185:9091/api/v1/verify
    // response type:
    // "id": "b72bcc11-9c59-4a17-baa9-6f69e10c0b22",
    // "fullName": "Nguyễn Văn A",
    // "email": "tiendai2821dhpt@gmail.com",
    // "isEligible": true,
    // "msv": "B19DCCN161",
    // "gpa": 3.01
    const response = await axios.post('http://192.168.43.174:8092/api/v1/verify', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    
    // const response = true
    if (response?.data) {
      console.log('response ----------------------- \n', response)
      if(response?.data?.isEligible){
        success(`Chúc mừng ${response?.data?.fullName} đã đủ điều kiện làm đồ án`)
      }
      else{
        error(`Rất tiếc ${response?.data?.fullName} không đủ điều kiện làm đồ án`)
      }
    } else {
      error('Có lỗi xảy ra')
    }
  }
  const normFile = (event) => {
    setData(event.file);
  };
  return (
    <div className="App">
      {contextHolder}
      <h1>Xét điều kiện làm đồ án</h1>
      <Form>
        <Form.Item><h3>Chọn file điểm của sinh viên:</h3></Form.Item>
        <Form.Item
          name="File"
          label="Upload"
          valuePropName="files"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item onClick={onclick}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;

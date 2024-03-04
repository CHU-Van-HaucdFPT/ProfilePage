import React from 'react'
import { DatePicker, Modal } from 'antd'
import { Form, Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message, Upload } from 'antd'
import instaceAxios from '../../Axios'
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const CreateProduct: React.FC = ({ show, handleCreate, getData }: any) => {
  const onFinish = async (values: any) => {
  
    await instaceAxios.post('products', {
      ...values,
      date: moment(values.date).format(dateFormat),
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s'
    })
    getData()
    handleCreate()
  }

  const handleCancel = () => {
    handleCreate()
  }

  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <>
      <Modal title='Create Product' open={show} onCancel={() => handleCancel()} footer={[]}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
          className='flex flex-col'
        >
          <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Input
              size='large'
              className='block w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none'
            />
          </Form.Item>

          <Form.Item label='Giá sản phẩm' name='price' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Input
              size='large'
              className='block w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none'
            />
          </Form.Item>
          <Form.Item
            label='Mô tả sản phẩm'
            name='description'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input
              size='large'
              className='block w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none'
            />
          </Form.Item>

          <Form.Item label='Ngày tạo' name='date' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <DatePicker
              size='large'
              className='block w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none'
            />
          </Form.Item>

          <Form.Item label='Hình ản' name='thumbnail' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item className=' flex justify-end' wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' className='bg-blue-600 mr-[40px] ' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateProduct

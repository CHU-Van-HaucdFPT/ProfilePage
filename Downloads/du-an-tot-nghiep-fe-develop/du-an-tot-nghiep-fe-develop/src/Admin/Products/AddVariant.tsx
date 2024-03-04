import React, { useEffect, useState } from 'react'
import { Modal, Select } from 'antd'
import { Form, Input } from 'antd'
import { Button } from 'antd'
import instaceAxios from '../../Axios'
import axios from 'axios'

const CreateProductVariant: React.FC = ({ show, handleCreate, selected, handleDetail }: any) => {
  const [options, setOptions] = useState({})
  const onFinish = async (values: any) => {
    await axios.post(`https://du-an-tot-nghiep-be-1.vercel.app/products/${selected._id}/options`, values)
    handleCreate()
    handleDetail()
  }

  const handleCancel = () => {
    handleCreate()
  }

  const handleSelect = async () => {
    const resp = await instaceAxios.get('variants')
    let totalOptions = {}
    for (const key in resp.data[0]) {
      if (key != '_id') {
        const optionItem = []

        for (const value of resp.data[0][key]) {
          optionItem.push({
            value: value.value,
            label: value.value
          })
        }
        totalOptions = { ...totalOptions, [key]: optionItem }
      }
    }
    setOptions(totalOptions)
  }

  useEffect(() => {
    handleSelect()
  }, [])

  return (
    <>
      <Modal title='Thêm sản phẩm biến thể' open={show} onCancel={() => handleCancel()} footer={[]}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
          className='flex flex-col'
        >
          <Form.Item label='Ram' name='ram' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Select placeholder='Chon option' className='w-100' options={options.ram} />
          </Form.Item>

          <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Input
              defaultValue={0}
              min={0}
              type='number'
              size='large'
              className='block w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none'
            />
          </Form.Item>
          <Form.Item label='Card' name='card' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Select placeholder='Chon option' className='w-100' options={options.card} />
          </Form.Item>
          <Form.Item label='Chip' name='chip' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Select placeholder='Chon option' className='w-100' options={options.chip} />
          </Form.Item>

          <Form.Item label='Rom' name='rom' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Select placeholder='Chon option' className='w-100' options={options.rom} />
          </Form.Item>
          <Form.Item label='Color' name='color' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Select placeholder='chon option' className='w-100' options={options.color} />
          </Form.Item>
          <Form.Item label='Quatity' name='quatity' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Input
              defaultValue={0}
              min={0}
              type='number'
              size='large'
              className='block w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none'
            />
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

export default CreateProductVariant

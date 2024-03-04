import React, { useEffect, useState } from 'react'
import { Button, Card, Empty, Form, Input, Modal, Popconfirm, Select, Space } from 'antd'
import { MdDelete } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import instaceAxios from '../../Axios'
import axios from 'axios'
const VariantsAdmin: React.FC = () => {
  const [data, setData] = useState({} as any)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const [selected, setSelected] = useState({} as any)
  const option = [
    { value: 'rom', label: 'Rom' },
    { value: 'ram', label: 'Ram' },
    { value: 'color', label: 'Color' },
    { value: 'chip', label: 'Chip' },
    { value: 'card', label: 'Card' }
  ]
  const fetchedData = async () => {
    const resp = await instaceAxios.get('variants')
    setData(resp.data)
  }

  const [form] = Form.useForm()

  const handleDelete = async (id: string) => {
    console.log(id)
    await axios.delete(`https://du-an-tot-nghiep-be-1.vercel.app/variants/65d383fddff9d68fbcdaf10e/${id}`)
    fetchedData()
  }

  useEffect(() => {
    fetchedData()
  }, [])

  const onCreate = async (values: any) => {
    await instaceAxios.post('variants/', { ...values, _id: '65d383fddff9d68fbcdaf10e' })
    fetchedData()
    setShowCreate(false)
  }

  const onEdit = async (values: any) => {
    await axios.put(`https://du-an-tot-nghiep-be-1.vercel.app/variants/${selected.field}/65d383fddff9d68fbcdaf10e`, {
      ...values,
      elementId: selected.id
    })
    fetchedData()
    setShowEdit(false)
  }

  const handleEdit = (item: any) => {
    setShowEdit(true)
    setSelected(item)
  }

  useEffect(() => {
    form.setFieldValue('newValue', selected.value)
  }, [selected])
  return (
    <div>
      <Button onClick={() => setShowCreate(true)} className='mb-[24px]'>
        Thêm biến thể{' '}
      </Button>
      <div className='variants-wrapper'>
        <Card className='border-[#ccc] border-[1px]' title='Rom' bordered={false} style={{ width: 500 }}>
          {data[0]?.rom.length > 0 ? (
            data[0]?.rom.map((item:any) => (
              <div className='flex items-center mb-[12px] justify-between'>
                {item?.value}{' '}
                <Space size='middle'>
                  <Popconfirm
                    placement='topLeft'
                    title={'Bạn có muốn xóa sản phẩm này không???'}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type='primary' danger>
                      <MdDelete />
                    </Button>
                  </Popconfirm>

                  <Button
                    onClick={() => {
                      handleEdit({ field: 'rom', ...item })
                    }}
                  >
                    <CiEdit />
                  </Button>
                </Space>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </Card>
        <Card className='border-[#ccc] border-[1px]' title='Ram' bordered={false} style={{ width: 500 }}>
          {data[0]?.ram.length > 0 ? (
            data[0]?.ram.map((item) => (
              <div className='flex items-center mb-[12px] justify-between'>
                {item?.value}{' '}
                <Space size='middle'>
                  <Popconfirm
                    placement='topLeft'
                    title={'Bạn có muốn xóa sản phẩm này không???'}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type='primary' danger>
                      <MdDelete />
                    </Button>
                  </Popconfirm>

                  <Button
                    onClick={() => {
                      handleEdit({ field: 'ram', ...item })
                    }}
                  >
                    <CiEdit />
                  </Button>
                </Space>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </Card>
        <Card className='border-[#ccc] border-[1px]' title='Color' bordered={false} style={{ width: 500 }}>
          {data[0]?.color.length > 0 ? (
            data[0]?.color.map((item) => (
              <div className='flex items-center mb-[12px] justify-between'>
                {item?.value}{' '}
                <Space size='middle'>
                  <Popconfirm
                    placement='topLeft'
                    title={'Bạn có muốn xóa sản phẩm này không???'}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type='primary' danger>
                      <MdDelete />
                    </Button>
                  </Popconfirm>

                  <Button
                    onClick={() => {
                      handleEdit({ field: 'color', ...item })
                    }}
                  >
                    <CiEdit />
                  </Button>
                </Space>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </Card>
        <Card className='border-[#ccc] border-[1px]' title='Chip' bordered={false} style={{ width: 500 }}>
          {data[0]?.chip.length > 0 ? (
            data[0]?.chip.map((item) => (
              <div className='flex items-center mb-[12px] justify-between'>
                {item?.value}{' '}
                <Space size='middle'>
                  <Popconfirm
                    placement='topLeft'
                    title={'Bạn có muốn xóa sản phẩm này không???'}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type='primary' danger>
                      <MdDelete />
                    </Button>
                  </Popconfirm>
{/* 
                  <Button
                    onClick={() => {
                      handleEdit({ field: 'chip', ...item })
                    }}
                  >
                    <CiEdit />
                  </Button> */}
                </Space>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </Card>
        <Card className='border-[#ccc] border-[1px]' title='Card' bordered={false} style={{ width: 500 }}>
          {data[0]?.card.length > 0 ? (
            data[0]?.card.map((item) => (
              <div className='flex items-center mb-[12px] justify-between'>
                {item?.value}{' '}
                <Space size='middle'>
                  <Popconfirm
                    placement='topLeft'
                    title={'Bạn có muốn xóa sản phẩm này không???'}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type='primary' danger>
                      <MdDelete />
                    </Button>
                  </Popconfirm>
{/* 
                  <Button
                    onClick={() => {
                      handleEdit({ field: 'card', ...item })
                    }}
                  >
                    <CiEdit />
                  </Button> */}
                </Space>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </Card>
      </div>

      <Modal title='Create Variants' open={showCreate} onCancel={() => setShowCreate(false)} footer={[]}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onCreate}
          autoComplete='off'
          layout='vertical'
          className='flex flex-col'
        >
          <Form.Item
            label='Lựa chọn biến thể'
            name='field'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Select placeholder={'Chọn loại'} allowClear style={{ width: '100%' }} options={option} />
          </Form.Item>

          <Form.Item label='Nhập thông tin' name='value' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Input
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

      <Modal title='Edit Variants' open={showEdit} onCancel={() => setShowEdit(false)} footer={[]}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onEdit}
          autoComplete='off'
          layout='vertical'
          className='flex flex-col'
          form={form}
        >
          <Form.Item
            label='Nhập thông tin'
            name='newValue'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input
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
    </div>
  )
}

export default VariantsAdmin

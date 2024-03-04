import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import type { TableProps } from 'antd'
import instaceAxios from '../../Axios'
import CreateProduct from './add'
import UpdateProduct from './update'
import DetailProduct from './Detail'
import CreateProductVariant from './AddVariant'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const ProductAdmin: React.FC = () => {
  const [products, setProducts] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showCreateVariant, setCreateVariant] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [selected, setSelected] = useState({})

  const getData = async () => {
    const resp = await instaceAxios.get('products')
    setProducts(
      resp.data.map((item, index) => {
        return { ...item, id: index + 1 }
      })
    )
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDelete = async (id: string) => {
    await instaceAxios.delete(`products/${id}`)
    await getData()
  }

  const handleCreate = () => {
    setShowCreate(!showCreate)
  }

  const handleCreateVariant = () => {
    setCreateVariant(!showCreateVariant)
  }

  const handleDetail = () => {
    setShowDetail(!showDetail)
  }

  const handleUpdate = () => {
    setShowUpdate(!showUpdate)
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'key'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '150px',
      render: (text) => <img className='rounded' src={text} alt='' />
    },

    {
      title: 'Mô tả sản phẩm',
      dataIndex: 'description',
      key: 'description',
      width: '300px'
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space className='w-[200px]' size='middle'>
          <div>
            <Popconfirm
              placement='topLeft'
              title={'Bạn có muốn xóa sản phẩm này không???'}
              okText='Yes'
              cancelText='No'
              onConfirm={() => handleDelete(record._id)}
            >
              <Button type='primary' danger>
                Xóa
              </Button>
            </Popconfirm>

            <Button className='mt-3'
              onClick={() => {
                setSelected(record)
                handleUpdate()
              }}
            >
              Sửa
            </Button>
          </div>

          <div>
            <Button
              type='primary'
              onClick={() => {
                setSelected(record)
                handleDetail()
              }}
              className='bg-blue-500'
            >
              Chi tiết
            </Button>

            <Button 
              type='primary'
              onClick={() => {
                setSelected(record)
                handleCreateVariant()
              }}
              className='bg-green-500 mt-3'
            >
              Thêm biến thể
            </Button>
          </div>
        </Space>
      )
    }
  ]

  return (
    <div>
      {showDetail && <DetailProduct show={showDetail} handleDetail={handleDetail} id={selected._id} />}
      {showCreateVariant && (
        <CreateProductVariant
          handleDetail={handleDetail}
          selected={selected}
          show={showCreateVariant}
          handleCreate={handleCreateVariant}
        />
      )}
      {showCreate && <CreateProduct show={showCreate} handleCreate={handleCreate} getData={getData} />}
      {showUpdate && (
        <UpdateProduct show={showUpdate} handleCreate={handleUpdate} selected={selected} getData={getData} />
      )}
      <Button onClick={() => handleCreate()}>Thêm sản phẩm </Button>
      <Table columns={columns} dataSource={products} />
    </div>
  )
}

export default ProductAdmin

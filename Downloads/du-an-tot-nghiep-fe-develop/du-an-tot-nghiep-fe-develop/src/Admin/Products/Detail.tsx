import React, { useEffect, useState } from 'react'
import { Button, Modal, Popconfirm, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import axios from 'axios'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const DetailProduct: React.FC = ({ id, show, handleDetail }: any) => {
  const [data, setData] = useState([])
  const getData = async (id: string) => {
    console.log(123)

    const resp = await axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/products/${id}`)
    setData(resp.data[0].optionsDetails)

    console.log(resp.data)
  }

  const handleDelete = async (idVariant: string) => {
    await axios.delete(
      `https://du-an-tot-nghiep-be-1.vercel.app/products/65dcc1d497fd56784a9dcc07/options/${idVariant}`
    )
    getData(id)
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt='' />
    },
    {
      title: 'Ram',
      dataIndex: 'ram',
      key: 'ram'
    },
    {
      title: 'Card',
      dataIndex: 'card',
      key: 'card'
    },
    {
      title: 'Rom',
      dataIndex: 'rom',
      key: 'rom'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Chip',
      dataIndex: 'chip',
      key: 'chip'
    },
    {
      title: 'Color',
      key: 'color',
      dataIndex: 'color',
      // render: (_) => <Tag color={'red'}>{_}</Tag>
    },
    {
      title: 'Quantity',
      dataIndex: 'quatity',
      key: 'quatity'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
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
        </Space>
      )
    }
  ]

  useEffect(() => {
    getData(id)

    console.log(data)
  }, [id])
  return (
    <Modal width={1000} title='Chi tieest bien the san pham' onCancel={() => handleDetail()} open={show}>
      <Table columns={columns} dataSource={data} />
    </Modal>
  )
}

export default DetailProduct

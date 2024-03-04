import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { Header, Footer } from '~/Components/Layouts/User';

const History = () => {
  const [data, setData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userId) return;
    axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Lỗi không thấy dữ liệu của lịch sử mua hàng:', error);
      });
  }, [userId]);

  if (!data) return null;

  const addToCart = (productId: string, quantity: number, options: string) => {
    axios.post(`https://du-an-tot-nghiep-be-1.vercel.app/cart/add-to-cart`, { userId, productId, quantity, options })
      .then(() => {
        setShowModal(true); // Hiển thị modal khi thêm vào giỏ hàng thành công
      })
      .catch((error) => {
        console.error('lỗi khi thêm vào giỏ hàng:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="flex-grow">
        <main className="bg-dark-subtle py-5">
          <div className="cart container bg-dark-subtle">
            <h2>Lịch sử mua hàng</h2>
            {data.map((order: any, index: number) => (
              <h6 key={index}>Cập nhật ngày: {new Date(order.updatedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</h6>
            ))}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Màu sắc</th>
                  <th>số lượng</th>
                  <th>Ngày mua</th>
                  <th>Thành tiền</th>
                  <th>Trạng thái </th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.items[0].product.name}</td>
                    <td>{item.items[0].product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>
                      {item.items.length > 0 && item.items[0].product && item.items[0].product.options && item.items[0].product.options.length > 0 && (
                        <div>{item.items[0].product.options[0].color}</div>
                      )}
                    </td>
                    <td>{item.items[0].quantity}</td>
                    <td>{item.createdAt ? new Date(item.updatedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }) : ''}</td>
                    <td>{item.totalAmount ? item.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}</td>
                    <td>{item.status}</td>
                    <td>
                      {item.status === 'completed' && (
                        <Button variant="info" onClick={() => addToCart(item.items[0].product._id, item.items[0].quantity, item.items[0].product.options)}>Đặt Lại</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Đã thêm vào giỏ hàng.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default History;

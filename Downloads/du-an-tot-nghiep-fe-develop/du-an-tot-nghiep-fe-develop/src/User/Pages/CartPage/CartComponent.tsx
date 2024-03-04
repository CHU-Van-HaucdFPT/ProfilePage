import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    const [data, setData] = useState<{ cart: { items: any[] }, totalAmount: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        setLoading(true); // Đặt trạng thái loading thành true khi bắt đầu tải dữ liệu
        axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/cart/${userId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('lỗi không thấy dữ liệu của giỏ hàng:', error);
            })
            .finally(() => {
                setLoading(false); // Đặt trạng thái loading thành false sau khi dữ liệu được tải xong (thành công hoặc thất bại)
            });
    }, []);

    // console.log(userId);


    const updateQuantity = (productId: string, quantity: number) => {
        axios.post(`https://du-an-tot-nghiep-be-1.vercel.app/cart/update-cart-item`, { userId, productId, quantity })
            .then(() => {
                setData(prevData => {
                    if (!prevData) return null;
                    const updatedItems = prevData.cart.items.map((item: any) => {
                        if (item.product._id === productId) {
                            // Cập nhật số lượng mới cho sản phẩm
                            return {
                                ...item,
                                quantity: quantity
                            };
                        }
                        return item;
                    });
                    // Tính lại tổng giá tiền mới sau khi cập nhật số lượng
                    const newTotalAmount = updatedItems.reduce((total: number, item: any) => {
                        return total + (item.product.price * item.quantity);
                    }, 0);
                    // Cập nhật dữ liệu giỏ hàng mới với danh sách sản phẩm đã cập nhật và tổng giá tiền mới
                    return {
                        ...prevData,
                        cart: {
                            ...prevData.cart,
                            items: updatedItems
                        },
                        totalAmount: newTotalAmount
                    };
                });
            })
            .catch((error) => {
                console.error('lỗi khi cập nhật số lượng sản phẩm:', error);
            });
    };



    const handleRemoveProduct = (productId: string) => {
        axios.post(`https://du-an-tot-nghiep-be-1.vercel.app/cart/delete-item`, { productId, userId })
            .then(() => {
                setData(prevData => {
                    if (!prevData) return null;
                    // Lọc bỏ sản phẩm có _id trùng khớp khỏi danh sách sản phẩm
                    const updatedItems = prevData.cart.items.filter((item: any) => item.product._id !== productId);
                    // Tính lại tổng giá tiền mới
                    const newTotalAmount = updatedItems.reduce((total: number, item: any) => {
                        return total + (item.product.price * item.quantity);
                    }, 0);
                    // Cập nhật dữ liệu giỏ hàng mới với danh sách sản phẩm đã cập nhật và tổng giá tiền mới
                    return {
                        ...prevData,
                        cart: {
                            ...prevData.cart,
                            items: updatedItems
                        },
                        totalAmount: newTotalAmount
                    };
                });
            })
            .catch((error) => {
                console.error('lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
            });
    };


    if (loading) {
        return (
            <div className="loading-indicator"><h1>Đang tải...</h1></div>
        );
    }

    if (!data || (data && data.cart.items.length === 0)) {
        return (
            <main className="bg-dark-subtle py-5">
                <div className="cart container bg-dark-subtle">
                    <p className="text-center text-danger">Không có sản phẩm nào trong giỏ hàng.</p>
                </div>
            </main>
        );
    }


    if (!data) return null;
    // console.log(data);

    return (
        <main className="bg-dark-subtle py-5">
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="spinner border-8 border-t-8 border-gray-200 rounded-full w-24 h-24 animate-spin"></div>
                </div>
            )}
            <div className="cart container bg-dark-subtle">
                <div className="table-responsive bg-white border-0 rounded-top-5">
                    <table className="table mt-4 text-center border-none fs-6 bg-white ">
                        <thead className="border-bottom-0 text-uppercase">
                            <tr>
                                <th scope='col' className="col-1">#</th>
                                <th scope='col' className="col-4">Sản phẩm</th>
                                <th scope='col' className="col-1">Số lượng</th>
                                <th scope='col' className="col-2">Đơn giá</th>
                                <th scope='col' className="col-2">Màu sắc</th>
                                <th scope='col' colSpan={2} className="col-2">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle table-group-divide">
                            {data?.cart?.items?.map((item: any, index: number) => (
                                <tr key={index} className="border-white">
                                    <td scope='row'>{index + 1}</td>
                                    <td className="row">
                                        <img className="col-4" src={item.product.thumbnail} alt={item.product.name} />
                                        <div className="col-8 text-start">
                                            <Link to={`/products/${item.product._id}`} className="icon-link icon-link-hover link-underline link-underline-opacity-0">{item.product.name}</Link>
                                        </div>

                                    </td>
                                    <td className="quantity bg-white">
                                        <button className="col-3 border-0 rounded-start-circle fs-3" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <input type="number" className="col-6 border-0 text-center" name="" id="" value={item.quantity} readOnly />
                                        <button className="col-3 border-0 rounded-end-circle fs-4" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </td>
                                    <td>
                                        <div> {item.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                    </td>

                                    <td>
                                        <div>
                                            {item.product.options.length > 0 && item.product.options[0].color}
                                        </div>
                                    </td>
                                    <td>
                                        <strong>{(item.product.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                    </td>


                                    <button className="border-0 delete-product" onClick={() => handleRemoveProduct(item.product._id)}>
                                        <i className="bi bi-trash3"></i>
                                    </button>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="total fs-4 bg-white border-0 rounded-bottom-5">
                    <div className="row px-5">
                        <p className="text-start col-6">Tổng thanh toán(Tạm tính):</p>
                        <p className="col-6 underline-200 text-end" style={{ color: 'green' }}>
                            <strong> {data.totalAmount.toLocaleString('vi-VN')}<span className="border-0"> ₫</span></strong>
                        </p>
                    </div>

                </div>

                <div className="row px-5 mt-3">
                    <button className="btn btn-primary" >Thanh toán</button>
                </div>
            </div>
            {/* Icon Zalo */}
            <a href="https://zalo.me/84943232444" target="_blank" rel="noopener noreferrer" className="zalo-icon">
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="Zalo" className="zalo-icon-img" style={{ width: '60px', position: 'fixed', bottom: '5px', right: '5px', zIndex: '9999' }} />
            </a>
        </main>

    );
};

export default Cart;

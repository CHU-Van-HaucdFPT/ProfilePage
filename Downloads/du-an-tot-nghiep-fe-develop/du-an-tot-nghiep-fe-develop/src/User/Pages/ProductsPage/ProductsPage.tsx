import React from 'react';
// css
import '../../../App.css'
import '../../../assets/css/brands.css'
import '../../../assets/css/link.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
// js
import 'bootstrap/js/index.esm'
//component
import {Header, Footer} from '../../../Components/Layouts/User/index'
import Link from './Link'
import Category from './Category'
import Filter from './Filter'
import Products from './Products'
import axios from 'axios';
import { notification } from 'antd';

const ProductPage = () => {
  const [data, setData] = React.useState([]);
  const [idToCompare, setIdToCompare]: any = React.useState([]);

  React.useEffect(() => {
    axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/products`).then((res) => {
      setData(res.data);
    })
  }, []);

  const addToCompare = (id: any) => {
    if (idToCompare.length > 1) {
      notification.error({ message: 'Chỉ được thêm tối đa 2 sản phẩm!' });
    } else {
      setIdToCompare([...idToCompare, id]);
      notification.success({ message: 'Đã thêm sản phẩm so sánh' });
    }
  }

  const removeCompare = (id: any) => {
    const removedList = idToCompare.filter((filter: any) => filter != id);
    setIdToCompare(removedList);
    notification.error({ message: 'Đã xóa sản phẩm khỏi so sánh!' });
  }

  return (
    <div>
      <Header />
      <div className="bg-main">
        <Link />
        <Category />
        <Filter idToCompare={idToCompare}/>
        {
          data.length > 0 ? 
            data.map((item: any) => <Products id={item._id} addToCompare={addToCompare} removeCompare={removeCompare} idToCompare={idToCompare}/>)
            :
            <></>
        }
      </div>
      <Footer></Footer>
    </div>
  )
}

export default ProductPage
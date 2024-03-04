import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloseOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

import styles from "./ProductComparison.module.scss";
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface IProductComparison {
    idToCompare: any;
    setOpenCompare: any;
}
const ProductComparison = (props: IProductComparison) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://du-an-tot-nghiep-be.vercel.app/products/sosanh/${props.idToCompare[0]}/${props.idToCompare[1]}`).then((res) => {
            setData(res.data);
        })
    }, [])

    return <div className={cx('productComparisonContainer')}>
        <CloseOutlined className={cx('closeIcon')} onClick={() => props.setOpenCompare(false)}/>
        <div className={cx('comparisonTitle')}>
            So sánh sản phẩm
        </div>
        <div className={cx('comparisonTable')}>
            {
                data.map((item: any) => {
                    return <div className={cx('comparisonItem')}>
                        <Product key={item._id} id={item._id} data={item}/>
                    </div>
                })
            }
        </div>
    </div>
}

interface IProduct {
    id: any,
    data: any
}
const Product = (props: IProduct) => {
    return <div className={cx('productContainer')}>
        <div className={cx('image')}>
            <img className={cx('firstImage')} src={props.data.thumbnail} alt="" />
            <img className={cx('secImage')} src={props.data.thumbnail} alt="" />
        </div>
        <div className={cx('name')}>{props.data.name}</div>
        <div className={cx('description')}>{props.data.description}</div>
        <div className={cx('price')}>{props.data.price} $</div>
        <div className={cx('date')}>
            Ngày cập nhật: <CalendarOutlined  style={{ marginRight: '.3rem' }}/>
            {moment(new Date(props.data.date)).format('YYYY-MM-DD')}
        </div>
    </div>
}

export default ProductComparison;
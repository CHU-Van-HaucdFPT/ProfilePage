import { useState, useEffect } from 'react';
import { Input, Pagination, Modal, Button, notification } from 'antd';
import moment from 'moment';
import { CalendarOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Search } = Input;

import styles from './NewsPageDemo.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

import AntCustomModal from '../../components/AntCustomModal';

const NewsPageDemo = () => {
    const [data, setData] = useState([]);
    const [aNewsData, setANewsData]: any = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(5);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        reloadData();
    }, []);

    const reloadData = (nextPage?: any) => {
        fetch(`https://du-an-tot-nghiep-be.vercel.app/news/pagination/${pageCount}/${nextPage ? nextPage : pageNumber}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
            })
            .then((data) => {
                // Xử lý dữ liệu JSON ở đây
                setData(data.data);
                // setPageNumber(data.p);
                // setPageCount(data.n);
                setTotal(data.Total);
                // console.log(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const create = (dataSend: any) => {
        fetch(`https://du-an-tot-nghiep-be.vercel.app/news`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                notification.success({ message: 'Tạo mới tin tức thành công!' });
                return response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
            })
            .then((data) => {
                // Xử lý dữ liệu JSON ở đây
                // console.log(data);
                reloadData();
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const openNews = (id: number) => {
        fetch(`https://du-an-tot-nghiep-be.vercel.app/news/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
            })
            .then((data) => {
                setANewsData(data)
            })
            .then(() => {
                setOpen(true);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    
    const deleteNews = (id: number) => {
        fetch(`https://du-an-tot-nghiep-be.vercel.app/news/${id}`, {
            method: 'DELETE'
            })
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
            })
            .then(() => {
                // Xóa dữ liệu thành công, thực hiện các hành động tiếp theo
                notification.success({ message: 'Xóa tin tức thành công!' });
                reloadData();
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <>
            <div className={cx('newsContainer')}>
                <div className={cx('header')}>
                    <div className={cx('headerName')}>
                        <div className={cx('name')}>TIN TỨC</div>
                        <AntCustomModal actionCreate={create} />
                    </div>
                    <div>
                        <Search className={cx('headerSearch')} placeholder="input search text" onSearch={() => {}} />
                    </div>
                </div>
                <div className={cx('body')}>
                    {data.map((item, index) => (
                        <NewsItem key={index} data={item} openNews={openNews} deleteNews={deleteNews} reloadData={reloadData}/>
                    ))}
                </div>
                <div className={cx('footer')}>
                    <Pagination
                        className={cx('pagination')}
                        onChange={(event) => {
                            setPageNumber(event);
                            reloadData(event);
                        }}
                        defaultCurrent={pageNumber}
                        total={total + 10}
                        showSizeChanger={false}
                        // showTotal={(total) => `${total} bài viết`}
                    />
                </div>
            </div>
            <Modal
                className={cx('newsDetailsModal')}
                title={<></>}
                centered
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={1000}
            >
                <div className={cx('newsDetailsContainer')}>
                    <div className={cx('newsTitle')}>{aNewsData[0]?.title}</div>
                    <div className={cx('newsUpdatedAt')}>
                        Ngày cập nhật: <CalendarOutlined />
                        {moment(new Date(aNewsData[0]?.updatedAt)).format('YYYY-MM-DD')}
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('newsContent')}>
                        <div dangerouslySetInnerHTML={{ __html: aNewsData[0]?.content }}></div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

interface INewsItem {
    data: any;
    openNews: (id: number) => void;
    deleteNews: (id: number) => void;
    reloadData: () => void;
}
const NewsItem = (props: INewsItem) => {
    const [open, setOpen] = useState(false);

    const update = (dataSend: any, id: any) => {
        fetch(`https://du-an-tot-nghiep-be.vercel.app/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
            .then((response) => {
                props.reloadData();

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div className={cx('newsItemContainer')}>
            <div className={cx('left')}>
                <div className={cx('newsImage')}>
                    {/* <img src={props.data.imageUrl} alt="No image" /> */}
                    <img
                        className={cx('firstImage')}
                        src="https://cdn.laptopvang.com/wp-content/uploads/2020/11/nen-mua-macbook-air-doi-nao.jpg"
                        alt=""
                    />
                    <img
                        className={cx('secImage')}
                        src="https://cdn.laptopvang.com/wp-content/uploads/2020/11/nen-mua-macbook-air-doi-nao.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('title')}>
                    <div className={cx('text')} onClick={() => props.openNews(props.data._id)}>
                        {props.data.title}
                    </div>
                    <div className={cx('btnActionUD')}>
                        <AntCustomModal actionCreate={update} dataUpdate={props.data}/>
                        <DeleteOutlined className={cx('delete')} onClick={() => setOpen(true)}/>
                    </div>
                </div>
                <div className={cx('viewCount')}>
                    Lượt xem:
                    <EyeOutlined />
                    <p style={{ color: 'red' }}>{props.data.statusNews}</p>
                </div>
                <div className={cx('shortContent')}>{props.data.shortContent}</div>
                <div className={cx('updatedAt')}>
                    Ngày cập nhật: <CalendarOutlined />
                    {moment(new Date(props.data.updatedAt)).format('YYYY-MM-DD')}
                </div>
            </div>
            <Modal
                className={cx('deleteActionModal')}
                title={<></>}
                centered
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={500}
            >
                <div className={cx('deleteActionContainer')}>
                    <div>
                        <div className={cx('title')}>Bạn thực sự muốn gỡ bỏ tin tức này?</div>
                        <div className={cx('desc')}>Thao tác sẽ không thể hoàn tác!</div>
                    </div>
                    <div className={cx('groupBtn')}>
                        <Button className={cx('btn')} onClick={() => {
                            props.deleteNews(props.data._id);
                            setOpen(false);
                        }} type="default">Xóa</Button>
                        <Button className={cx('btn')} onClick={() => setOpen(false)} type="primary" danger>Hủy</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default NewsPageDemo;

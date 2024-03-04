import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBCol,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";

import { useState, useEffect } from 'react';
import moment from 'moment';
import { Input, Pagination, Modal, Button, notification } from 'antd';
import { CalendarOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from './News.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default function App() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(5);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [aNewsData, setANewsData]: any = useState([]);

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

  const openNews = (e: any, id: any) => {
    e.preventDefault();
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

  return (
    <MDBContainer className="py-5">
      <Modal
          className={cx('newsDetailsModal')}
          title={<></>}
          centered
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          // width={1000}
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
      {/* Here */}
      <MDBRow className="gx-lg-5">
        {
          data.length > 0 ?
          data.map((news: any) => {
            return <MDBCol key={news._id} lg="4" md="12" className="mb-4 mb-lg-0" onClick={(e) => openNews(e, news._id)}>
                <div>
                  <MDBRipple
                    className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                    rippleTag="div"
                    rippleColor="light"
                  >
                    <img
                      src="https://cdn.laptopvang.com/wp-content/uploads/2020/11/nen-mua-macbook-air-doi-nao.jpg"
                      className="img-fluid"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                  <MDBRow className="mb-3">
                    <MDBCol col="6">
                      <a href="" className="text-warning">
                        <MDBIcon fas icon="code" className="me-1" />
                        Technology
                      </a>
                    </MDBCol>
                    <MDBCol col="6" className="text-end">
                      <u>{moment(new Date(news.updatedAt)).format('DD-MM-YYYY')}</u>
                    </MDBCol>
                  </MDBRow>
                  <a href="#!" className="text-dark">
                    <h5>{news.title}</h5>
                    <p>
                      {news.shortContent}
                    </p>
                  </a>
                  <hr />
                </div>
              </MDBCol>
          })
          :
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img style={{ width: 600 }} src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg" alt="" />
          </div>
        }
      </MDBRow>
      <nav aria-label="...">
        <Pagination
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onChange={(event) => {
              setPageNumber(event);
              reloadData(event);
          }}
          defaultCurrent={pageNumber}
          total={total + 10}
          showSizeChanger={false}
          // showTotal={(total) => `${total} bài viết`}
        />
      </nav>
    </MDBContainer>
  );
}
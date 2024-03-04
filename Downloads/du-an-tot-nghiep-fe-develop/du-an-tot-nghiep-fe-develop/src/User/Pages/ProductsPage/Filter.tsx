import { useState } from "react";
import { notification } from 'antd';
import ProductComparison from "../components/ProductComparison";

interface ICareer {
  idToCompare: any;
}
const Careers = (props: ICareer) => {
  const [openCompare, setOpenCompare] = useState(false);
  const compare = () => {
    if (props.idToCompare.length != 2) {
      notification.error({ message: 'Chưa đủ 2 sản phẩm để so sánh!' });
    } else {
      setOpenCompare(true);
    }
  }
  return (
    <>
      {
        openCompare && <ProductComparison idToCompare={props.idToCompare} setOpenCompare={setOpenCompare}/>
      }
      <div className="container">
        <div className="title"><h3>Sản phẩm: Màn hình</h3></div>
        <div className="sort-filter row ">
          <div className="sort-price col-12 ms-1 col-sm-12 col-xl-7 col-lg-8 col-md-12 row mb-1">
            <button className="rounded-5 me-0 me-lg-2 border-0 mt-2 col-6 col-sm-6 col-xl-2 col-lg-3 col-md-4 btn btn-light">Mặc định</button>
            <button className="rounded-5 me-0 me-lg-2 border-0 mt-2 col-6 col-sm-6 col-xl-2 col-lg-3 col-md-4 btn btn-light">Dưới 500K</button>
            <button className="rounded-5 me-0 me-lg-2 border-0 mt-2 col-6 col-sm-6 col-xl-2 col-lg-3 col-md-4 btn btn-light">500K - 1 Triệu</button>
            <button className="rounded-5 me-0 me-lg-2 border-0 mt-2 col-6 col-sm-6 col-xl-2 col-lg-3 col-md-4 btn btn-light">1 - 2 Triệu</button>
            <button className="rounded-5 me-0 me-lg-2 border-0 mt-2 col-6 col-sm-6 col-xl-2 col-lg-3 col-md-4 btn btn-light">2 - 5 Triệu</button>
            <button className="rounded-5 me-0 me-lg-2 border-0 mt-2 col-6 col-sm-6 col-xl-2 col-lg-3 col-md-4 btn btn-light">Trên 5 Triệu</button>
          </div>
          <div className="more-filter ms-1 col-12 col-sm-12 col-xl-5 col-lg-4 col-md-12 row mb-3">
            <div className="dropdown rounded-4 sort-select mt-2 col-6 col-sm-6 col-xl-4 col-lg-4 col-md-4 me-0 me-md-2 my-1 px-1">
              <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sắp xếp theo</button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Giá Thấp đến Cao</a></li>
                <li><a className="dropdown-item" href="#">Giá Cao đến Thấp</a></li>
              </ul>
            </div>
            <div className="dropdown rounded-4 status-select mt-2 col-6 col-sm-6 col-xl-4 col-lg-4 col-md-4 me-0 me-md-2 my-1 px-1">
              <button className="btn btn-light  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Tình trạng</button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Hàng mới</a></li>
                <li><a className="dropdown-item" href="#">Hàng cũ</a></li>
              </ul>
            </div>
            <button className="btn btn-light rounded-4 border-0 mt-2 col-6 col-sm-6 col-xl-4 col-lg-6 col-md-3" onClick={() => compare()}>So sánh</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;

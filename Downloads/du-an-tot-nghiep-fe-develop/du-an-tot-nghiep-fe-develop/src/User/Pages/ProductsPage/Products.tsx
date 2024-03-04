interface IProduct {
    id: any,
    addToCompare: (id: any) => void;
    removeCompare: (id: any) => void;
    idToCompare: any;
}
const Products = (props: IProduct) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 p-2 mt-2 col-sm-6 col-xl-3 col-md-4 col-lg-3">
                    <div className="rounded-4 bg-light text-center">
                        <div className="btn-soSanh">
                            {/* placehoder */}
                        </div>
                        <div className="img" >
                            <img src="https://macone.vn/wp-content/uploads/2023/11/Macbook-14-inch-Silver-300x250.png" alt="" />
                        </div>
                        <div className="nameProduct fs-5">
                            <a href="#">Sản Phẩm 1</a>
                        </div>
                        <div className="price p-2">
                            <h4 className="fw-bold w-full fs-4 text-center">60.000 VNĐ</h4>
                        </div>
                        {
                            props.idToCompare.filter((filter: any) => filter == props.id).length > 0 ?
                            <div className="pb-2 add-to-compare" style={{ cursor: "pointer", color: 'red' }} onClick={() => props.removeCompare(props.id)}>
                                Bỏ so sánh
                            </div>
                            :
                            <div className="pb-2 add-to-compare" style={{ cursor: "pointer", color: 'green' }} onClick={() => props.addToCompare(props.id)}>
                                Thêm vào so sánh
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
const Link = () => {
  return (
    <div className="container link-row fs-5 py-3"><a className="text-decoration-none pe-1"  href="/"><i className="fs-5 bi bi-house-heart-fill"></i>Home</a> <span>{'>'}</span><a className="text-decoration-none px-1" href="/accessory">Phụ kiện</a> <span>{'>'}</span><a className="text-decoration-none px-1" href="/screen">Màn hình</a></div>
  );
};

export default Link;
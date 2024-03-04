import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Gửi biểu mẫu thông qua email hoặc xử lý tại đây
    console.log(formData);
    // Sau khi gửi, bạn có thể làm sạch biểu mẫu bằng cách đặt lại giá trị của formData
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4">Liên hệ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-600 mb-1">Tên của bạn</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-600 mb-1">Email của bạn</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-600 mb-1">Nội dung</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Gửi
          </button>
        </form>
        <div className="mt-8 flex items-center">
          <button
            className="flex items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12 hover:bg-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="ml-4">
              <p className="text-gray-600">Bắt đầu cuộc trò chuyện trực tuyến</p>
              <p className="text-gray-600">Nhân viên sẽ sớm phản hồi!</p>
            </div>
          )}
        </div>
      </div>
      {/* Icon Zalo */}
      <a href="https://zalo.me/84943232444" target="_blank" rel="noopener noreferrer" className="zalo-icon">
        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="Zalo" className="zalo-icon-img" style={{ width: '60px', position: 'fixed', bottom: '5px', right: '5px', zIndex: '9999' }} />
      </a>
    </div>
    
  );
};

export default Contact;

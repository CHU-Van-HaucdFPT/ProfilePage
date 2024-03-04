import {Header} from '../../../Components/Layouts/User/index'
import { Footer } from '../../../Components/Layouts/User/index'
import Cart from './CartComponent'

const CartPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <Cart />
      </div>
      <Footer />
    </div>
  );
};


export default CartPage
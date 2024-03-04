import { notification } from 'antd';
import axios from 'axios'

export const login =  async(username:string, password: string, JWT_KEY: string) => {
    try {
        const data = await axios.post('https://du-an-tot-nghiep-be.vercel.app/auth/login', { username, password, JWT_KEY });
        const role = data.data.userDelPass;
        const userRole = role[0].role;
        const userId = role[0]._id;
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        notification.error
    }
};


export const SignupUser = (username: any, mail: any, password: any, image: any, role: any) => async () => {
    try {
        const data = await axios.post('https://du-an-tot-nghiep-be.vercel.app/auth/register', { username, mail, password, image, role })
        document.location.href = '/';
    } catch (error) {
        notification.error  
    }
};

export const SignoutUser = (user: any) => async () => {
    localStorage.removeItem('userInfo')
    document.location.href = '/';
};

export const getAllUser = () => async ( getState: () => { userSignin: { userInfo: any; }; }) => {
    const {
        userSignin: { userInfo },
    } = getState()
    try {
        const { data } = await axios.get('https://du-an-tot-nghiep-be-1.vercel.app/users/65cf6e419398fc792e574359')
    } catch (error) {
        notification.error
    }
}

export const deleteUser = (userId: any) => async ( getState: () => { userSignin: { userInfo: any; }; }) => {
    const {
        userSignin: { userInfo },
    } = getState()
    try {
        const { data } = await axios.delete(`https://du-an-tot-nghiep-be-1.vercel.app/news/65cf1b0972839744a7190732/${userId}`)
    } catch (error) {
        notification.error
    }
}
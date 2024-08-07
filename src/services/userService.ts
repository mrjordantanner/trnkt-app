import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../models/user';
import { UpdateUserRequestBody } from '../models/updateUserRequestBody';

class UserService {
  private apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  baseUrl = `${this.apiEndpoint}/api/user`;
  tokenKey = 'jwt';
	axiosOptions: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			//'Access-Control-Allow-Origin': 'http://localhost:5173',
		},
	};


  async registerNewUserAsync(email: string, userName: string, password: string): Promise<User | null> {
    if (!email || !userName || !password) {
      console.error('Required User Info not provided. User registration aborted.');
      return null;
    }

    const url = `${this.baseUrl}/users`;
    try {
      console.log(`Registering new user: ${email} / ${userName}...`);
      const response = await axios.post(url, {
        email,
        userName,
        password,
      }, this.axiosOptions);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async fetchUserByEmailAsync(email: string | null): Promise<User | null> {
    if (!email) {
      return null;
    }
    const url = `${this.baseUrl}/users/${email}`;
    try {
      console.log(`Fetching User by email: ${email}...`);
      const response = await axios.get(url, this.axiosOptions);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async fetchAllUsersAsync(email: string | null): Promise<User[] | null> {
    if (!email) {
      return null;
    }
    const url = `${this.baseUrl}/users/all`;
    try {
      console.log(`Fetching all Users...`);
      const response = await axios.get(url, this.axiosOptions);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUserInfoAsync(updateUserInfo: UpdateUserRequestBody): Promise<User | null> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No JWT token found');
    }

    const email = updateUserInfo.email;
    const body: UpdateUserRequestBody = { email };
    if (updateUserInfo.newEmail) body.newEmail = updateUserInfo.newEmail;
    if (updateUserInfo.newUserName) body.newUserName = updateUserInfo.newUserName;
    if (updateUserInfo.newPassword) body.newPassword = updateUserInfo.newPassword;

    console.log('UpdateUserInfoAsync: updateUserRequestBody:', updateUserInfo);

    const url = `${this.baseUrl}/users/update`;
    try {
      console.log(`Updating user info for ${email}...`);
      const response = await axios.patch(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async loginUserAsync(email: string, password: string): Promise<User | null> {
    const url = `${this.baseUrl}/login`;
    try {
      console.log(`Logging in user ${email}...`);
      const response = await axios.post(url, {
        email,
        password,
      }, this.axiosOptions);
      localStorage.setItem(this.tokenKey, response.data.token);
      return response.data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async logoutUserAsync(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No JWT token found');
    }

    const url = `${this.baseUrl}/logout`;
    console.log(`-- LOGOUT URL --`);
    console.log('API Endpoint:', this.apiEndpoint);
    console.log('Base URL:', this.baseUrl);
    console.log('URL:', url);
    try {
      console.log(`Logging out user...`);
      await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem(this.tokenKey);
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

export default UserService;

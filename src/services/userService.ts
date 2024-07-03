import { User } from '../models/user';
import { UpdateUserRequestBody } from '../models/updateUserRequestBody';

// TODO use arrow functions 
// TODO add constructor for baseUrl?
// TODO use axios instead of fetch

class UserService {
  tokenKey = 'jwt';
  private baseUrl = 'http://localhost:5000/api/user';
  getRequestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  async registerNewUserAsync(email: string, userName: string, password: string): Promise<User | null> {
    if (!email || !userName || !password) {
      console.error('Required User Info not provided. User registration aborted.');
      return null; 
    }
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        userName: userName,
        password: password
      }),
    };
    const url = `${this.baseUrl}/users`;
    try {
      console.log(`Registering new user: ${email} / ${userName}...`);
      const response = await fetch(url, options);
      const user = await response.json();
      return user;

    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
    }
  }
 
  async fetchUserByEmailAsync(email: string | null): Promise<User | null> {
    if (!email) { return null; }
    const url = `${this.baseUrl}/users/${email}`;
    try {
      console.log(`Fetching User by email: ${email}...`);
      const response = await fetch(url, this.getRequestOptions);
      const user = await response.json();
      return user;

    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
    }
  }

  async fetchAllUsersAsync(email: string | null): Promise<User[] | null> {
    if (!email) { return null; }
    const url = `${this.baseUrl}/users/all`;
    try {
      console.log(`Fetching all Users...`);
      const response = await fetch(url, this.getRequestOptions);
      const users = await response.json();
      console.log(users);
      return users;
    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
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

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    };

    const url = `${this.baseUrl}/users/update`;
    try {
      console.log(`Updating user info for ${email}...`);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to update user information');
      }
      const updatedUser: User = await response.json();
      return updatedUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async loginUserAsync(email: string, password: string): Promise<User | null> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const url = `${this.baseUrl}/login`;
    try {
      console.log(`Logging in user ${email}...`);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem(this.tokenKey, data.token);
      return data.user;
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
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const url = `${this.baseUrl}/logout`;
    try {
      console.log(`Logging out user...`);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      localStorage.removeItem('jwt');
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

import { User } from '../models/user';

class UserService {
  private baseUrl = 'http://localhost:5000/api/user';
  getRequestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  async fetchUserByEmail(email: string | null): Promise<User | null> {
    if (!email) { return null; }

    const url = `${this.baseUrl}/users/${email}`;

    try {
      console.log(`Fetching User by email: ${email}...`);
      const response = await fetch(url, this.getRequestOptions);
      const data = await response.json();
      console.log(data);
      console.log(data.user);
      return data.user;

    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
    }
  }

  async loginUser(email: string, password: string): Promise<boolean> {
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

      await response.json();
      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async logoutUser(): Promise<boolean> {
    const url = `${this.baseUrl}/logout`;
  
    try {
      console.log(`Logging out user...`);
      const response = await fetch(url, this.getRequestOptions);
  
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
    return localStorage.getItem('jwt');
  }



}

export default UserService;

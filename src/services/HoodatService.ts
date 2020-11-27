import { API_ROOT } from '../lib/constants';

export interface List {
  id: string;
  name: string;
  owner: string;
  color: number;
  contacts: Contact[];
}

export interface Contact {
  id: string;
  name: string;
  owner: string;
  image: {
    url: string;
  };
}

interface SignInResponse {
  statusCode: number;
  message: string;
  userId: string;
  token: string;
}

interface SignUpResponse {
  statusCode: number;
  message: string;
  userId: string;
}

/**
 * HoodatService
 *
 * A service used to make requests to the Hoodat API
 * @param baseURL the root URL endpoint to use when making requests
 */
class HoodatService {
  BASE_URL: string;

  constructor(baseURL: string) {
    this.BASE_URL = baseURL;
  }

  async addContact(
    listId: string,
    name: string,
    image: {
      name: string;
      data: string;
    },
    token: string
  ): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        image: {
          name: image.name,
          data: image.data,
        },
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async addList(name: string, color: number, token: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async getLists(userId: string, token: string): Promise<List[]> {
    const response = await fetch(`${this.BASE_URL}/users/${userId}/lists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async removeContactFromList(
    contactId: string,
    listId: string,
    token: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/lists/${listId}/contacts/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async removeList(listId: string, token: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<SignUpResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }
}

export default new HoodatService(API_ROOT);

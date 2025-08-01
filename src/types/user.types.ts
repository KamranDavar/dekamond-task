export interface User {
    name: {
      first: string;
      last: string;
      title: string;
    };
    email: string;
    phone: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    login: {
      username: string;
    };
  }
  
  export interface RandomUserResponse {
    results: User[];
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  }
  
  export interface LoginFormData {
    phone: string;
  }
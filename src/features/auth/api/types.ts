export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: 'STUDENT' | 'INSTRUCTOR';
  };
};

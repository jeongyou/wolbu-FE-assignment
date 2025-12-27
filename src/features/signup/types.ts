export type Role = 'STUDENT' | 'INSTRUCTOR';

export type SignUpFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
};

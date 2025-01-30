interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
  createdAt: Date | null;
}

interface ProductParams {
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image?: string;
}

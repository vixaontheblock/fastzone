export interface Vehicle {
  id: number;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel: string;
  images: string[];
  featured: boolean;
  status: "available" | "sold" | "reserved";
}
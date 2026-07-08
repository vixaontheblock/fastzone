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
  videos?: string[];
  featured: boolean;
  status: "available" | "sold" | "reserved";
  financing?: boolean;
  hot?: boolean;
  specs?: {
    engine?: string;
    power?: string;
    drivetrain?: string;
    doors?: number;
    seats?: number;
    color?: string;
    origin?: string;
  };
  description?: string;
}

export interface ServiceProduct {
  name: string;
  serialNumber: string;
  qty: number;
  price: number;
  total: number;
  warranty?: string;
}
export type ServiceProductsList = ServiceProduct[];

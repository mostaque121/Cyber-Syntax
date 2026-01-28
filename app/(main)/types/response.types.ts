import { CategoryItem } from "./category.types";
import { ProductItem } from "./product.types";

export interface ProductsByPathResponse {
  category: CategoryItem | null;
  data: ProductItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

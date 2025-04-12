import { OrderProductDTO } from './orderProductDTO';
import { ProductDTO } from './productDTO';
import { SupplierDTO } from './supplierDTO';
export interface SaleRequestDTO {
    customerUsername: string;
    productSkusAndQuantities: {[key:number]:number};
}
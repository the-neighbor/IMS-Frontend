import { OrderProductDTO } from './orderProductDTO';
import { ProductDTO } from './productDTO';
import { SupplierDTO } from './supplierDTO';
export interface OrderRequestDTO {
    supplier_id: number;
    productSkusAndQuantities: {[key:number]:number};
}
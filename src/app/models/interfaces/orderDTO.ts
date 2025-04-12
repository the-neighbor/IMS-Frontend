import { OrderProductDTO } from './orderProductDTO';
import { ProductDTO } from './productDTO';
import { SupplierDTO } from './supplierDTO';
export interface OrderDTO {
    orderId: string;
    totalPrice: number;
    productList?: OrderProductDTO[];
    supplier: SupplierDTO;
    orderCreated?: Date;
    orderUpdated?: Date;
    orderCompleted?: Date;
    orderStatus?: string;
 }
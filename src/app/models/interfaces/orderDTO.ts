import { OrderProductDTO } from './orderProductDTO';
import { ProductDTO } from './productDTO';
import { SupplierDTO } from './supplierDTO';
export interface OrderDTO {
    // [key: string]: any;
    orderId: string;
    totalPrice: number;
    productList?: OrderProductDTO[];
    supplier: SupplierDTO;
    orderCreated?: Date;
    orderUpdated?: Date;
    orderCompleted?: Date;
    orderStatus?: string;
 }
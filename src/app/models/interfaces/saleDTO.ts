import { SaleProductDTO } from "./saleProductDTO";

export interface SaleDTO {
    saleId: string;
    totalPrice: number;
    productList?: SaleProductDTO[];
    customerUsername: string;
    saleCreated?: Date;
    saleUpdated?: Date;
    saleCompleted?: Date;
    saleStatus?: string;
}
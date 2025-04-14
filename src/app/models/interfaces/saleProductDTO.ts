export interface SaleProductDTO {
    sku: number;
    name: string;
    description: string;
    buyPrice: number;
    sellPrice: number;
    price?: number;
    quantity: number;
}
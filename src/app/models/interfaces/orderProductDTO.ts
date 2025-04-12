export interface OrderProductDTO {
    sku: number;
    name: string;
    description: string;
    price?: number;
    buyPrice: number;
    sellPrice: number;
    quantity: number;
}
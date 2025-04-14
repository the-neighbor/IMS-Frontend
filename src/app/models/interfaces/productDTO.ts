export interface ProductDTO {
    sku: number;
    name: string;
    description: string;
    price?: number;
    buyPrice: number;
    sellPrice: number;
    initial_stock: number;
    supplierId?: number;
    supplierName?: string;
    imageUrl?: string;
}
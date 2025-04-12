import { provideHttpClient } from "@angular/common/http";

export const environment = {

    API_URL:"http://localhost:8080",
    LOGIN_PATH:"/security/login",
    REGISTER_PATH:"/security/register",
    IMS_PATH:"/api/v1/inventory",
    ORDERS_PATH:"/orders",
    SUPPLIERS_PATH:"/supplier",
    INV_PATH:"/stockapi",
    SALES_PATH:"/sales",
    SEED_PATH:"/seed",
};

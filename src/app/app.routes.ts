import { CanMatch, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanMatch {
    constructor(private authService: AuthService, private router: Router) {}

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAdmin()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const routes: Routes = [
    { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'suppliers', loadComponent: () => import('./pages/suppliers/suppliers.component').then(m => m.SuppliersComponent), canMatch: [AdminGuard] },
    { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent), canMatch: [AdminGuard] },
    { path: 'orders/place', loadComponent: () => import('./pages/orders/components/place-order/place-order.component').then(m => m.PlaceOrderComponent), canMatch: [AdminGuard] },
    { path: 'orders/view/:orderId', loadComponent: () => import('./pages/orders/components/view-order/view-order.component').then(m => m.ViewOrderComponent), canMatch: [AdminGuard] },
    { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent), canMatch: [AdminGuard] },
    { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
    { path: 'products/view/:sku', loadComponent: () => import('./pages/products/components/view-product/view-product.component').then(m => m.ViewProductComponent), canMatch: [AdminGuard] },
    { path: 'purchase-orders', loadComponent: () => import('./pages/sales/sales.component').then(m => m.SalesComponent)},
    { path: 'admin-sales', loadComponent: () => import('./pages/admin-sales/admin-sales.component').then(m => m.AdminSalesComponent)},
    { path: 'sales/place', loadComponent: () => import('./pages/sales/components/place-sale/place-sale.component').then(m => m.PlaceSaleComponent)},
];

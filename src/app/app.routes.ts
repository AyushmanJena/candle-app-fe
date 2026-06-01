import { Routes } from '@angular/router';
import {LoginComponent} from './admin/login/login.component';
import {authGuard} from './auth/auth.guard';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {HomepageComponent} from './user/homepage/homepage.component';
import {CartPageComponent} from './user/cart-page/cart-page.component';
import {ListingPageComponent} from './user/listing-page/listing-page.component';
import {ProductPageComponent} from './user/product-page/product-page.component';
import {CollectionsComponent} from './user/collections/collections.component';
import {AboutUsComponent} from './user/about-us/about-us.component';
import {CheckoutComponent} from './user/cart-page/checkout/checkout.component';
import {
  CollectionsMainContentComponent
} from './user/collections/collections-main-content/collections-main-content.component';
import {CollectionDetailComponent} from './user/collections/collection-detail/collection-detail.component';
import { TrackOrderComponent } from './user/cart-page/track-order/track-order.component';

export const routes: Routes = [

  // public routes
  {path: '', component: HomepageComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'listing-page', component: ListingPageComponent},
  {path: 'track-order', component: TrackOrderComponent},
  {path: 'product/:id', component: ProductPageComponent},


  {
    path: 'collections',
    component: CollectionsComponent,
    children: [
      {
        path: '',
        component: CollectionsMainContentComponent
      },
      {
        path: ':collectionId',
        component: CollectionDetailComponent
      }
    ]
  },


  {path: 'about-us', component: AboutUsComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent },

  // admin routes (lazy loaded)
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/dashboard/admin.routes')
        .then(m => m.ADMIN_ROUTES)
  },

  { path: '**', redirectTo: '' }
];

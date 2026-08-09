import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CartItem, CartService } from '../../../shared/services/cart-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


declare var Razorpay: any;


@Component({
  selector: 'app-checkout',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;

  subTotal: number = 0;
  deliveryCharge: number = 0;
  couponAmount: number = 0;
  couponCode: string = '';
  grandTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name:        ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email:       ['', [Validators.required, Validators.email]],
      houseNumber: ['', Validators.required],
      area:        ['', Validators.required],
      landmark:    [''],
      pincode:     ['', Validators.required],
      city:        ['', Validators.required],
      state:       ['', Validators.required],
    });

    this.calculateTotals();
  }

  calculateTotals(): void {
    const cartItems: CartItem[] = this.cartService.getCartItems();

    this.subTotal = cartItems.reduce((sum, item) => sum + item.quantity * 100, 0);

    this.deliveryCharge = this.subTotal >= 500 ? 0 : 50;

    this.grandTotal = this.subTotal + this.deliveryCharge - this.couponAmount;
  }

  buildDeliveryAddress(): string {
    const f = this.checkoutForm.value;
    return `${f.houseNumber}, ${f.area}, ${f.landmark ? f.landmark + ', ' : ''}${f.city}, ${f.state} - ${f.pincode}`;
  }

  buildOrderPayload(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) {
    const f = this.checkoutForm.value;
    const cartItems: CartItem[] = this.cartService.getCartItems();

    return {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderData: {
        subTotal:        this.subTotal,
        deliveryCharge:  this.deliveryCharge,
        grandTotal:      this.grandTotal,
        couponAmount:    this.couponAmount,
        couponCode:      this.couponCode || null,
        customerName:    f.name,
        deliveryAddress: this.buildDeliveryAddress(),
        phoneNumber:     f.phoneNumber,
        emailAddress:    f.email,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity:  item.quantity
        }))
      }
    };
  }

  onPayNow(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const f = this.checkoutForm.value;

    this.paymentService.createRazorpayOrder(this.grandTotal).subscribe({
      next: (res) => {

        const options = {
          key: 'rzp_test_SyFVsjcxhMpe8y',
          amount: this.grandTotal * 100,
          currency: 'INR',
          order_id: res.orderId,
          name: 'Your Store Name',
          description: 'Order Payment',
          prefill: {
            name:    f.name,
            email:   f.email,
            contact: f.phoneNumber
          },
          theme: { color: '#000000' },

          handler: (response: any) => {
            const payload = this.buildOrderPayload(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            this.paymentService.verifyAndSave(payload).subscribe({
              next: (result) => {
                this.cartService.clearCart();
                this.router.navigate(['/order-success', result.orderId]);
              },
              error: () => {
                alert('Payment was received but order could not be saved. Please contact support with your payment ID: ' + response.razorpay_payment_id);
              }
            });
          },

          modal: {
            ondismiss: () => {
              console.log('Payment popup closed by user');
            }
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
      },
      error: () => {
        alert('Could not initiate payment. Please try again.');
      }
    });
  }
}
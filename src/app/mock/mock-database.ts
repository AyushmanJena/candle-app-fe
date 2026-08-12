import { CollectionsList } from "../admin/interfaces/collections.interface";
import { CouponsList } from "../admin/interfaces/coupons.interface";
import { HomePageData } from "../user/interface/HomePageData.interface";
import { LoginRequest } from "../admin/login/login.component";
import { ProductCardData, ProductDetails } from "../user/interface/Product.interface";
import { OrderDetailsResponse } from "../user/interface/TrackOrderDetails.interface";

export const MOCK_PRODUCTS: ProductCardData[] = [
  {
    productId: 1,
    title: 'Pikachu',
    imageUrl: 'images/pikachu1.jpg',
    description: 'Pikachu is an adorable electric Pokémon known for its yellow fur, lightning abilities, loyal nature, and iconic cheerful personality.',
    discountedPrice: 799,
    originalPrice: 999,
    inStock: true
  },

  {
    productId: 2,
    title: 'Bulbasaur',
    imageUrl: 'images/bulbasaur1.jpg',
    description: 'Bulbasaur is a friendly Grass-Poison Pokémon known for the plant bulb on its back, powerful vines, and loyal, gentle nature.',
    discountedPrice: 999,
    originalPrice: 1299,
    inStock: true
  },

  {
    productId: 3,
    title: 'Squirtle',
    imageUrl: 'images/squirtle1.jpg',
    description: 'Squirtle is a cute Water-type Pokémon known for its blue shell, powerful water attacks, playful personality, and strong defensive abilities.',
    discountedPrice: 1999,
    originalPrice: 2499,
    inStock: true
  },

  {
    productId: 4,
    title: 'Psyduck',
    imageUrl: 'images/psyduck1.jpg',
    description: 'Psyduck is a quirky Water-type Pokémon known for its yellow appearance, constant headaches, confusion, and mysterious psychic abilities when overwhelmed.',
    discountedPrice: 2499,
    originalPrice: 2999,
    inStock: true
  },

  {
    productId: 5,
    title: 'Gengar',
    imageUrl: 'images/gengar1.jpg',
    description: 'Gengar is a mischievous Ghost-Poison Pokémon known for its shadowy appearance, sinister grin, haunting abilities, and playful love of pranks.',
    discountedPrice: 1499,
    originalPrice: 1799,
    inStock: false
  }
];

export const MOCK_PRODUCT_DETAILS: ProductDetails[] = [

  {
    productId: 1,
    title: 'Pikachu',

    imageUrl: [
      {
        displayOrder: 1,
        imageId: 101,
        imageUrl: 'images/pikachu1.jpg'
      },
      {
        displayOrder: 2,
        imageId: 102,
        imageUrl: 'images/pikachu2.jpg'
      },
      {
        displayOrder: 3,
        imageId: 103,
        imageUrl: 'images/pikachu3.jpg'
      }
    ],

    description:
      'Pikachu is an adorable electric Pokémon known for its yellow fur, lightning abilities, loyal nature, and iconic cheerful personality.',

    discountedPrice: 799,
    originalPrice: 999,

    similarProductIds: [2, 5],

    quantityAvailable: 25
  },

  {
    productId: 2,
    title: 'Bulbasaur',

    imageUrl: [
      {
        displayOrder: 1,
        imageId: 201,
        imageUrl: 'images/bulbasaur1.jpg'
      },
      {
        displayOrder: 2,
        imageId: 202,
        imageUrl: 'images/bulbasaur2.jpg'
      },
      {
        displayOrder: 3,
        imageId: 203,
        imageUrl: 'images/bulbasaur3.jpg'
      },
    ],

    description:
      'Bulbasaur is a friendly Grass-Poison Pokémon known for the plant bulb on its back, powerful vines, and loyal, gentle nature.',

    discountedPrice: 999,
    originalPrice: 1299,

    similarProductIds: [1, 5],

    quantityAvailable: 18
  },

  {
    productId: 3,
    title: 'Squirtle',

    imageUrl: [
      {
        displayOrder: 1,
        imageId: 301,
        imageUrl: 'images/squirtle1.jpg'
      },
      {
        displayOrder: 2,
        imageId: 302,
        imageUrl: 'images/squirtle2.jpg'
      },
      {
        displayOrder: 3,
        imageId: 303,
        imageUrl: 'images/squirtle3.jpg'
      },
    ],

    description:
      'Squirtle is a cute Water-type Pokémon known for its blue shell, powerful water attacks, playful personality, and strong defensive abilities.',

    discountedPrice: 1999,
    originalPrice: 2499,

    similarProductIds: [1, 4],

    quantityAvailable: 10
  },

  {
    productId: 4,
    title: 'Psyduck',

    imageUrl: [
      {
        displayOrder: 1,
        imageId: 401,
        imageUrl: 'images/psyduck1.jpg'
      },
      {
        displayOrder: 2,
        imageId: 402,
        imageUrl: 'images/psyduck2.jpg'
      },
      {
        displayOrder: 3,
        imageId: 403,
        imageUrl: 'images/psyduck3.jpg'
      },
    ],

    description:
      'Psyduck is a quirky Water-type Pokémon known for its yellow appearance, constant headaches, confusion, and mysterious psychic abilities when overwhelmed.',

    discountedPrice: 2499,
    originalPrice: 2999,

    similarProductIds: [3],

    quantityAvailable: 14
  },

  {
    productId: 5,
    title: 'Gengar',

    imageUrl: [
      {
        displayOrder: 1,
        imageId: 501,
        imageUrl: 'images/gengar1.jpg'
      },
      {
        displayOrder: 2,
        imageId: 502,
        imageUrl: 'images/gengar2.jpg'
      },
      {
        displayOrder: 3,
        imageId: 503,
        imageUrl: 'images/gengar3.jpg'
      },
    ],

    description:
      'Gengar is a mischievous Ghost-Poison Pokémon known for its shadowy appearance, sinister grin, haunting abilities, and playful love of pranks.',

    discountedPrice: 1499,
    originalPrice: 1799,

    similarProductIds: [1, 2],

    quantityAvailable: 0
  }
];

export const MOCK_COLLECTIONS: CollectionsList[] = [

  {
    collectionId: 1,
    title: 'Team Yellow',
    imageUrl: 'images/Collection1.jpg',
    url: '/collections/1',
    productsList: [1, 4]
  },

  {
    collectionId: 2,
    title: 'The Duo',
    imageUrl: 'images/Collection2.jpg',
    url: '/collections/2',
    productsList: [2, 3]
  },

  {
    collectionId: 3,
    title: 'Ghost Type',
    imageUrl: 'images/Collection3.jpg',
    url: '/collections/3',
    productsList: [5]
  }
];

export const MOCK_COUPONS: CouponsList[] = [

  {
    couponId: 1,
    couponCode: 'WELCOME10',
    discountPercentage: 10,
    minimumPurchase: 1000,
    activeStatus: true
  },

  {
    couponId: 2,
    couponCode: 'SUMMER20',
    discountPercentage: 20,
    minimumPurchase: 2000,
    activeStatus: true
  },

  {
    couponId: 3,
    couponCode: 'OLDUSER15',
    discountPercentage: 15,
    minimumPurchase: 1500,
    activeStatus: false
  }
];


export const MOCK_HOMEPAGE_DATA: HomePageData = {

  bannerImageUrls: [
    'banner/banner1.png',
    'banner/banner2.jpg',
    'banner/banner3.png'
  ],

  featuredCollections: [1, 2],

  bestSellers: [1, 2, 4],

  reviews: [
    'Amazing quality and fast delivery.',
    'Great products and excellent service.',
    'Very happy with my purchase.'
  ]
};

export const MOCK_ORDERS: OrderDetailsResponse[] = [
  {
    orderId: 1001,
    orderStatus: 'SHIPPED',
    expectedDelivery: '2026-08-12',
    subTotal: 1798,
    deliveryCharge: 50,
    grandTotal: 1848,
    couponAmount: 100,
    couponCode: 'WELCOME10',
    customerName: 'Ayush',
    deliveryAddress: 'Bhubaneswar, Odisha',
    phoneNumber: '9999999999',
    emailAddress: 'ayush@example.com',
    paymentMethod: 'RAZORPAY',
    items: [
      {
        itemId: 1,
        productId: 1,
        quantity: 1
      },
      {
        itemId: 2,
        productId: 2,
        quantity: 1
      }
    ]
  },

  {
    orderId: 1002,
    orderStatus: 'PLACED',
    expectedDelivery: '2026-08-15',
    subTotal: 2499,
    deliveryCharge: 0,
    grandTotal: 2499,
    customerName: 'Rahul',
    deliveryAddress: 'Cuttack, Odisha',
    phoneNumber: '9876543210',
    emailAddress: 'rahul@example.com',
    paymentMethod: 'RAZORPAY',
    items: [
      {
        itemId: 3,
        productId: 4,
        quantity: 1
      }
    ]
  },

  {
    orderId: 1003,
    orderStatus: 'DELIVERED',
    expectedDelivery: '2026-08-03',
    subTotal: 1999,
    deliveryCharge: 50,
    grandTotal: 2049,
    customerName: 'Priya',
    deliveryAddress: 'Bhubaneswar, Odisha',
    phoneNumber: '9123456789',
    emailAddress: 'priya@example.com',
    paymentMethod: 'RAZORPAY',
    items: [
      {
        itemId: 4,
        productId: 3,
        quantity: 1
      }
    ]
  }
];

export const MOCK_ADMIN_USER: LoginRequest = {
  username: 'admin',
  password: 'admin123'
};


export const MOCK_DB = {
  products: MOCK_PRODUCTS,
  productDetails: MOCK_PRODUCT_DETAILS,
  collections: MOCK_COLLECTIONS,
  coupons: MOCK_COUPONS,
  homepage: MOCK_HOMEPAGE_DATA,
  orders: MOCK_ORDERS,
  adminUser: MOCK_ADMIN_USER
};

const data = {
  products: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      image: {
        url: 'https://res.cloudinary.com/dbkjz7c7t/image/upload/v1682527055/btpipamxgkvntqpk4q4j.jpg',
        public_id: 'btpipamxgkvntqpk4q4j',
      },
      description: 'A popular shirt',
      price: 70,
      numReviews: 8,
      rating: 4.5,
      feedback: [
        {
          author: { email: 'qwerty@gmail.com', name: 'Hanna' },
          content: 'The best shirt.',
        },
      ],
      sizeCountInStock: [
        {
          size: 'xs',
          quantity: 10,
        },
        {
          size: 's',
          quantity: 10,
        },
        {
          size: 'm',
          quantity: 10,
        },
        {
          size: 'l',
          quantity: 10,
        },
        {
          size: 'xl',
          quantity: 10,
        },
        {
          size: 'xxl',
          quantity: 10,
        },
      ],
      brand: '64497416420adfcb4e53e284',
      category: '64497416420adfcb4e53e27f',
      season: '64497417420adfcb4e53e289',
    },
    {
      name: 'Modern Shirt',
      slug: 'modern-shirt',
      image: {
        url: 'https://res.cloudinary.com/dbkjz7c7t/image/upload/v1682083178/cld-sample-4.jpg',
        public_id: 'cld-sample-4',
      },
      description: 'A modern shirt',
      price: 75,
      sizeCountInStock: [
        {
          size: 's',
          quantity: 10,
        },
      ],
      brand: '64497416420adfcb4e53e285',
      category: '64497416420adfcb4e53e27f',
      season: '64497417420adfcb4e53e28b',
    },
    {
      name: 'Modern Jeans',
      slug: 'modern-jeans',
      image: {
        url: 'https://res.cloudinary.com/dbkjz7c7t/image/upload/v1682083178/cld-sample-3.jpg',
        public_id: 'cld-sample-3',
      },
      description: 'A modern jeans',
      price: 175,
      sizeCountInStock: [
        {
          size: 'l',
          quantity: 10,
        },
        {
          size: 'm',
          quantity: 10,
        },
      ],
      brand: '64497416420adfcb4e53e286',
      category: '64497416420adfcb4e53e280',
      season: '64497417420adfcb4e53e28c',
    },
    {
      name: 'Modern Boots',
      slug: 'modern-boots',
      image: {
        url: 'https://res.cloudinary.com/dbkjz7c7t/image/upload/v1682083177/cld-sample.jpg',
        public_id: 'cld-sample',
      },
      description: 'A modern shirt',
      price: 200,
      sizeCountInStock: [
        {
          size: 'm',
          quantity: 10,
        },
        {
          size: 'xl',
          quantity: 10,
        },
      ],
      brand: '64497416420adfcb4e53e284',
      category: '64497416420adfcb4e53e281',
      season: '64497417420adfcb4e53e28a',
    },
    {
      name: 'Nice Jeans',
      slug: 'nice-jeans',
      image: {
        url: 'https://res.cloudinary.com/dbkjz7c7t/image/upload/v1682083165/samples/ecommerce/accessories-bag.jpg',
        public_id: 'accessories-bag',
      },
      description: 'A nice jeans',
      price: 25,
      numReviews: 1,
      rating: 5,
      sizeCountInStock: [
        {
          size: 's',
          quantity: 10,
        },
        {
          size: 'xs',
          quantity: 10,
        },
        {
          size: 'm',
          quantity: 10,
        },
      ],
      brand: '64497416420adfcb4e53e285',
      category: '64497416420adfcb4e53e280',
      season: '64497417420adfcb4e53e28c',
    },
  ],
  brands: [{ name: 'Nike' }, { name: 'Adidas' }, { name: 'Puma' }],
  categories: [{ name: 'Shirts' }, { name: 'Jeans' }, { name: 'Boots' }],
  season: [
    { name: 'Winter' },
    { name: 'Spring' },
    { name: 'Summer' },
    { name: 'Autumn' },
  ],
};

export default data;

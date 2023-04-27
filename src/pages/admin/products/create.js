import { CustomListBox } from '@components/CustomListBox';
import Layout from '@components/Layout';
import { UploadImage } from '@components/UploadImage';
import { Listbox } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateProductPage = () => {
  const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [options, setOptions] = useState({
    categories: [],
    brands: [],
    seasons: [],
  });
  const [formValues, setFormValues] = useState({
    name: '',
    slug: '',
    price: '',
    image: { public_id: '', url: '' },
    category: { value: '', label: '' },
    brand: { value: '', label: '' },
    season: { value: '', label: '' },
    description: '',
    sizeCountInStock: sizes.reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {}),
  });
  const router = useRouter();

  const getAllOptions = async () => {
    const endpoints = ['/api/brands', '/api/categories', '/api/seasons'];
    const results = await Promise.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );
    const [brands, categories, seasons] = results.map((res) =>
      res.data.map((optionItem) => ({
        value: optionItem._id,
        label: optionItem.name,
      }))
    );

    console.log({ brands, categories, seasons });
    setOptions({ brands, categories, seasons });
  };

  useEffect(() => {
    getAllOptions();
  }, []);

  const handleFieldChange = (field, value) => {
    if (field === 'sizeCountInStock') return;
    setFormValues({ ...formValues, [field]: value });
  };
  const handleSizeCountInStockChange = (size, value) => {
    setFormValues({
      ...formValues,
      sizeCountInStock: { ...formValues.sizeCountInStock, [size]: value },
    });
  };

  console.log(formValues, 'formValues');

  const submitHandler = async ({
    name,
    slug,
    price,
    image,
    category,
    brand,
    season,
    description,
    sizeCountInStock,
  }) => {
    try {
      setIsLoading(true);
      await axios.post(`/api/products`, {
        name,
        slug,
        price,
        image,
        category,
        brand,
        season,
        description,
        sizeCountInStock: Object.entries(sizeCountInStock).map(
          ([size, quantity]) => ({ size, quantity })
        ),
      });
      setErr('');
      setIsLoading(false);
      router.push('/admin/products');
    } catch (err) {
      console.log(err, 'err');
      setErr('');
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
        <h1 className='mb-4 text-xl'>Create product</h1>
        <div className='mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='w-full border border-gray-300'
            id='name'
            autoFocus
            required
            onChange={(e) => handleFieldChange('name', e.target.value)}
            value={formValues.name}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='slug'>Slug</label>
          <input
            type='text'
            className='w-full border border-gray-300'
            id='slug'
            required
            onChange={(e) => handleFieldChange('slug', e.target.value)}
            value={formValues.slug}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='price'>Price</label>
          <input
            type='text'
            className='w-full border border-gray-300'
            id='price'
            required
            onChange={(e) => handleFieldChange('price', e.target.value)}
            value={formValues.price}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='image'>image</label>
          <input
            type='text'
            className='w-full border border-gray-300'
            id='image'
            onChange={() => {}}
            value={formValues.image.url}
          />
        </div>
        <UploadImage
          setImage={(uploadedImage) =>
            handleFieldChange('image', uploadedImage)
          }
        />

        <div className='mb-4'>
          <label htmlFor='category'>category</label>
          <CustomListBox
            onChange={(value) => handleFieldChange('category', value)}
            selectedOption={formValues.category}
            options={options.categories}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='brand'>brand</label>
          <CustomListBox
            onChange={(value) => handleFieldChange('brand', value)}
            selectedOption={formValues.brand}
            options={options.brands}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='season'>season</label>
          <CustomListBox
            onChange={(value) => handleFieldChange('season', value)}
            selectedOption={formValues.season}
            options={options.seasons}
          />
        </div>

        {sizes.map((size) => (
          <div key={size} className='mb-4'>
            <label htmlFor={`Stock q-ty ${size}`}>
              Stock q-ty {size.toUpperCase()}
            </label>
            <input
              type='text'
              className='w-full border border-gray-300'
              id={`sizeCountInStock${size}`}
              onChange={(e) =>
                handleSizeCountInStockChange(size, e.target.value)
              }
              value={formValues.sizeCountInStock[size]}
              required
            />
          </div>
        ))}

        <div className='mb-4'>
          <label htmlFor='description'>description</label>
          <textarea
            type='text'
            className='w-full border border-gray-300'
            id='description'
            onChange={(e) => handleFieldChange('description', e.target.value)}
            value={formValues.description}
            required
            rows='5'
          />
        </div>
        <div className='mb-4'>
          <button
            disabled={isLoading}
            className='bg-orange-300 py-2 px-4 rounded-lg'
          >
            {isLoading ? 'Loading' : 'Submit'}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateProductPage;

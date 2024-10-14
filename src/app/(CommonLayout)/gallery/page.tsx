/* eslint-disable prettier/prettier */
'use client';
import React from 'react';
import { Image } from '@nextui-org/react';

import Container from '@/src/components/UI/Global/Container';
// import { galleryItems } from '@/src/utils/galleryItems';

const Gallery = () => {
  const galleryItems = [
    {
      title: 'Beautiful Blooms',
      description:
        'Explore vibrant flowers that bring color and life to any garden.',
      imageUrl:
        'https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg?t=st=1728741343~exp=1728744943~hmac=0075ab95beab378b71a50d8364c948720658565eafc27d98bcbbaa7ed9df32a1&w=740',
      colSpan: 'sm:col-span-2',
    },
    {
      title: 'Vegetable Garden',
      description:
        'Learn how to grow your own vegetables for a sustainable lifestyle.',
      imageUrl:
        'https://img.freepik.com/free-photo/hard-work-garden-brings-results_329181-4615.jpg?t=st=1728741551~exp=1728745151~hmac=03ef60f180cfff73d9509ecdb7d16b129dc5f255ae8cf62ad7ea2ab7bb101eb2&w=360',
      colSpan: '',
    },
    {
      title: 'Lush Greenery',
      description:
        'Discover the beauty of lush plants that create a serene environment.',
      imageUrl:
        'https://img.freepik.com/free-photo/green-path_1308-5000.jpg?t=st=1728741498~exp=1728745098~hmac=88b63c98ab27974506d9397f2ec0321d82ea5b0cf188c827287575d31eb785ac&w=360',
      colSpan: '',
    },
    {
      title: 'Sacculent',
      description:
        'Explore a variety of succulents that are perfect for low-maintenance gardening.',
      imageUrl:
        'https://img.freepik.com/free-photo/cactus-plants-arrangement-still-life_23-2150275310.jpg?t=st=1728742155~exp=1728745755~hmac=a15d149e9be8665e841305aaebb73deb789a81e017679a3ccd7578a0e4d13d1b&w=360',
      colSpan: '',
    },
    {
      title: 'Garden Pathway',
      description:
        'Explore a variety of succulents that are perfect for low-maintenance gardening.',
      imageUrl:
        'https://img.freepik.com/free-photo/beautiful-flowery-garden-sunny-day_58702-10424.jpg?t=st=1728741959~exp=1728745559~hmac=ca7c66cfe4bf6326a5d116aa106740379643a0b577eccf345c13f37828fee73f&w=360',
      colSpan: '',
    },
    {
      title: 'Vertical Garden',
      description: 'Innovative vertical gardening techniques for small spaces.',
      imageUrl:
        'https://img.freepik.com/free-photo/cheerful-gardener-with-flowers_23-2147768509.jpg?t=st=1728742025~exp=1728745625~hmac=990836f8d1f85ed9c473ed047200b8847b933d07bf93f8cda7dab59a02d881a3&w=740',
      colSpan: 'sm:col-span-2',
    },
  ];

  return (
    <Container>
      <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-center flex-col gap-5 mb-14">
          {/* <span className="bg-green-50 text-green-500 text-xs font-medium px-3.5 py-1 rounded-full">
              Garden Portfolio
            </span> */}
          <h2 className="font-manrope font-bold text-4xl  text-center">
            Exploring Nature&apos;s Beauty
          </h2>
          <p className="text-lg font-normal text-gray-500 max-w-3xl mx-auto text-center">
            Discover the art of gardening and the beauty of nature in our
            curated gallery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-14">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`bg-cover rounded-lg ${item.colSpan} max-sm:h-80 flex justify-end flex-col px-7 py-6`}
            >
              <Image
                alt={`Gardening image for ${item.title}`}
                className="w-full rounded-lg object-cover"
                src={item.imageUrl}
              />
              <h6 className="font-medium text-xl leading-8 text-white mb-4">
                {item.title}
              </h6>
              <p className="text-base font-normal text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Gallery;

/* eslint-disable prettier/prettier */
'use client';
import React, { useState, useEffect } from 'react';
import { Image, Skeleton } from '@nextui-org/react';

import Container from '@/src/components/UI/Global/Container';
import { galleryItems } from '@/src/utils/galleryItems';

const Gallery = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading delay of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-center flex-col gap-5 mb-14">
          <h2 className="font-manrope font-bold text-4xl text-center">
            Exploring Nature&apos;s Beauty
          </h2>
          <p className="text-lg font-normal text-gray-500 max-w-3xl mx-auto text-center">
            Discover the art of gardening and the beauty of nature in our
            curated gallery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-14">
          {loading
            ? // Render Skeletons if loading
              galleryItems.map((_, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-end px-7 py-6 rounded-lg bg-gray-200`}
                >
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <div className="mt-4">
                    <Skeleton className="w-full h-6 rounded-md" />
                    <Skeleton className="w-full h-4 rounded-md mt-1" />
                  </div>
                </div>
              ))
            : // Render gallery items
              galleryItems.map((item, index) => (
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

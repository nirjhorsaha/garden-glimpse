/* eslint-disable prettier/prettier */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Link,
} from '@nextui-org/react';

import { cardsData } from '@/src/utils/cardItems';

const AboutUs = () => {
  return (
      <div className='pt-8 px-6'>
      <motion.h2
        animate={{ opacity: 1, y: 0 }}
        className="font-manrope font-bold text-4xl text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }} // slight delay for heading
      >
        Garden Glimpse
      </motion.h2>

      {/* Animated Paragraph with Staggered Entrance */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-normal text-gray-500 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }} // delay for paragraph
      >
        Welcome to Garden Glimpse! Here, we believe that gardening is not just a hobby—it&apos;s a journey of discovery and connection. Whether you&apos;re a budding enthusiast or a seasoned expert, our mission is to inspire and empower you with valuable resources, a supportive community, and exclusive content tailored to enhance your gardening experience. Join us as we cultivate knowledge, share experiences, and grow together in our love for plants and nature.
      </motion.p>

      <div className="flex flex-wrap justify-center my-4 md:p-6 gap-4">
        {cardsData.map(({ icon, title, subtitle, description, link }, index) => (
          <motion.div
            key={title}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // staggered entrance
          >
            <Card className="max-w-[500px]">
              <CardHeader className="flex gap-3">
                {icon}
                <div className="flex flex-col">
                  <h4>{title}</h4>
                  <p className="text-default-500">{subtitle}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{description}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon color='success' href={link.href}>
                  {link.text}
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {/* <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.5 }} // delay for button
      >
        <motion.div
          initial={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button color="success" size="md">
            Join the Garden Glimpse Community
          </Button>
        </motion.div>
      </motion.div> */}
    </div>
  );
};

export default AboutUs;



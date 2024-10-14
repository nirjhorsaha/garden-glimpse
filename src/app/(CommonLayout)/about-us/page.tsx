/* eslint-disable prettier/prettier */
'use client';
import React from 'react';
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Link,
} from '@nextui-org/react';
import { Leaf, HelpCircle, User } from 'lucide-react'; // Importing Lucide icons

import Container from '@/src/components/UI/Global/Container';

const AboutUs = () => {
  return (
    <Container>
      <h2 className="font-manrope font-bold text-4xl  text-center mb-6">
        About Garden Glimpse{' '}
      </h2>
      <p className="text-lg font-normal text-gray-500 max-w-5xl mx-auto text-center">
        Welcome to GardenGlimpse. Whether you are a hobbyist or a professional,
        our goal is to inspire, educate, and connect gardeners around the world
        through expert advice, community support, and premium content.
      </p>
      <div className="flex flex-wrap justify-center p-6 gap-4">
        {/* Card 1: Gardening Knowledge */}
        <Card className="max-w-[500px]">
          <CardHeader className="flex gap-3">
            <Leaf color="#22c55e" size={40} />
            <div className="flex flex-col">
              <h4>Gardening Knowledge</h4>
              <p className="text-default-500">Expert Tips & Guides</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              Discover expert gardening tips, plant care advice, and seasonal
              guides to help your plants thrive.
            </p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href="/">
              Explore Knowledge
            </Link>
          </CardFooter>
        </Card>

        {/* Card 2: Community Support */}
        <Card className="max-w-[500px]">
          <CardHeader className="flex gap-3">
            <HelpCircle color="#22c55e" size={40} />
            <div className="flex flex-col">
              <h4>Community Support</h4>
              <p className="text-default-500">Join Our Community</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              Connect with fellow gardeners! Share advice, upvote content,
              comment, and follow others to create a vibrant gardening
              community.
            </p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href="/">
              Join Community
            </Link>
          </CardFooter>
        </Card>

        {/* Card 3: Premium Access */}
        <Card className="max-w-[500px]">
          <CardHeader className="flex gap-3">
            <User color="#22c55e" size={40} />
            <div className="flex flex-col">
              <h4>Premium Access</h4>
              <p className="text-default-500">Unlock Exclusive Content</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              Unlock premium content for in-depth gardening guides, exclusive
              tips, and special features that provide detailed insights into
              gardening techniques.
            </p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href="/">
              Access Premium Content
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Button color="success" size="lg">
          Join the Garden Glimpse Community
        </Button>
      </div>
    </Container>
  );
};

export default AboutUs;

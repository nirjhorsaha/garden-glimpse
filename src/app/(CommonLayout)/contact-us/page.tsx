/* eslint-disable prettier/prettier */
"use client"
import {
  Card,
  Input,
  Button,
  Textarea,
  CardBody,
} from '@nextui-org/react';

import Container from '@/src/components/UI/Global/Container';

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    alert('Form submitted!');
  };

  return (
    <Container>
      <Card className="max-w-md mx-auto">
        <CardBody>
          <h1 className="mb-8 text-center text-2xl" color="primary">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit}>
            <Input label="Name" placeholder="Enter your name" />
            <Input
              className="mt-4"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Textarea
              className="mt-4"
              label="Message"
              placeholder="Your message..."
              rows={5}
            />
            <Button className="mt-4 w-full" color="success" type="submit">
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ContactUs;

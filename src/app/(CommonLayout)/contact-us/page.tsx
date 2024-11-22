"use client";

import {
  Card,
  Input,
  Button,
  Textarea,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { MailIcon, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { variants } from "@/src/constant";
import { ContactCardProps } from "@/src/types";


// ContactCard component
const ContactCard: React.FC<ContactCardProps> = ({ icon, title, children }) => (
  <Card className="mb-4 p-2">
    <CardHeader className="pb-0 pt-2 flex-row items-start text-success text-lg">
      {icon} {title}
    </CardHeader>
    <CardBody className="overflow-visible">
      <p className="text-default-500">{children}</p>
    </CardBody>
  </Card>
);

const ContactUs = () => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <div className="flex w-full flex-col justify-center md:h-[calc(100vh-200px)] px-6 mt-10 md:mt-0">
      <motion.h2
        animate="visible"
        className="font-manrope font-bold text-4xl text-center mb-6"
        initial="hidden"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        Contact Us
      </motion.h2>
      <motion.p
        animate="visible"
        className="text-lg font-normal text-gray-500 max-w-5xl mx-auto text-center"
        initial="hidden"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={variants}
      >
        We’d love to hear from you! Please fill out the form below with your
        inquiries.
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        {/* Contact Information Section */}
        <div className="w-full sm:w-1/2">
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={variants}
          >
            <ContactCard icon={<Phone className="mr-2" />} title="Phone">
              Call us at: +1 (555) 123-4567
            </ContactCard>
          </motion.div>
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.5, delay: 0.6 }}
            variants={variants}
          >
            <ContactCard icon={<MailIcon className="mr-2" />} title="Email">
              support@gardenglimpse.com
            </ContactCard>
          </motion.div>
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.5, delay: 0.8 }}
            variants={variants}
          >
            <ContactCard icon={<MapPin className="mr-2" />} title="Visit Us">
              456 Tech Avenue, Suite 100, San Jose, CA 95112
            </ContactCard>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full sm:w-1/2">
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.5, delay: 1 }}
            variants={variants}
          >
            <Card className="max-w-lg mx-auto">
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Input required label="Name" />
                  <Input
                    fullWidth
                    required
                    className="mt-4"
                    label="Email"
                    type="email"
                  />
                  <Textarea
                    fullWidth
                    required
                    className="mt-4"
                    label="Your message.."
                    rows={5}
                  />
                  <Button className="mt-4 w-full" color="success" type="submit">
                    Send
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

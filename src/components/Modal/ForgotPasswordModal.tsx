/* eslint-disable prettier/prettier */

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';

import resetEmailValidationSchema from '@/src/schemas/resetEmailValidation.schema';

// Define the form values explicitly
interface ForgotPasswordFormValues {
  resetEmail: string;
}

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (email: string) => void; 
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSendEmail,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(resetEmailValidationSchema),
  });

  // When the form is submitted, send the reset email
  const handleSendEmail = (data: ForgotPasswordFormValues) => {
    onSendEmail(data.resetEmail); 
    onClose(); // Close modal after sending email
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Forgot Password?</ModalHeader>
            <ModalBody>
              <p>Enter your email to receive reset instructions:</p>
              <Controller
                control={control}
                name="resetEmail"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    variant="bordered"
                  />
                )}
              />
              {errors.resetEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.resetEmail.message as string}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="success" onSubmit={handleSubmit(handleSendEmail)}>
                Send
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;

/* eslint-disable prettier/prettier */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useUser } from "@/src/context/user.provider"; // Adjust the import based on your context path
import { updateUserProfile } from "@/src/services/PostService";
import { IUser } from "@/src/types";

const EditNameModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useUser(); // Assuming you have an updateUser function in your context

    // Initialize the form with useForm
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: user?.name || "", // Set default value from user context
        },
    });

    // Set the form value when the modal opens
    useEffect(() => {
        setValue("name", user?.name || "");
    }, [user?.name, setValue]);

    const onSubmit = (data: IUser) => {
        console.log(data); // Log the data for debugging
        updateUserProfile({...data, name: data.name }); // Update user with the new name
        onClose(); // Close the modal after submission
    };

    return (
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Name</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="Name"
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })} // Register the input with validation
                                    variant="bordered"
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" onPress={handleSubmit(onSubmit)}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditNameModal;

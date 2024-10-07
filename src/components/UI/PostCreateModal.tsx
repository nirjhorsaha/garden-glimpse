/* eslint-disable prettier/prettier */

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Textarea,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form";

const categories = [
    { value: "vegetables", label: "Vegetables" },
    { value: "flowers", label: "Flowers" },
    { value: "landscaping", label: "Landscaping" },
    { value: "succulents", label: "Succulents" },
    { value: "indoor-plants", label: "Indoor Plants" },
    { value: "others", label: "Others" },
];

export default function PostCreateModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { register, handleSubmit } = useForm(); // Initialize useForm

    // Handle form submission
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data); // Log the form data
        onClose(); // Close the modal after submission
    };

    return (
        <>
            <Button
                aria-label="Create Post"
                className="mt-2 w-full rounded-md bg-blue-500 text-white hover:bg-blue-600"
                onPress={onOpen}
            >
                <Plus size={16} /> Create Post
            </Button>
            <Modal
                aria-labelledby="create-post-modal"
                isOpen={isOpen}
                placement="top-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 p-4" id="create-post-modal">
                                Create a Post
                            </ModalHeader>
                            <ModalBody className="p-4">
                                <form onSubmit={handleSubmit(onSubmit)}> {/* Wrap inputs in a form */}
                                    <Input
                                        aria-required="true"
                                        className="mb-4" // Add margin bottom
                                        label="Title"
                                        placeholder="Enter post title"
                                        variant="bordered"
                                        {...register("title", { required: true })} // Register the title input
                                    />
                                    <Textarea
                                        aria-required="true"
                                        className="mb-4" // Add margin bottom
                                        label="Content"
                                        placeholder="Enter post content"
                                        rows={4}
                                        variant="bordered"
                                        {...register("content", { required: true })} // Register the content input
                                    />

                                    <Select
                                        aria-required="true"
                                        className="mb-4" // Add margin bottom
                                        label="Category"
                                        variant="bordered"
                                        {...register("category", { required: true })} // Register the category input
                                    >
                                        {categories.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Input
                                        accept="image/*"
                                        className="mb-4" // Add margin bottom
                                        label="Upload Image"
                                        type="file"
                                        variant="bordered"
                                        {...register("image")} // Register the image input
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            // Handle image upload here if needed
                                            register("image").onChange(e); // Call the registered change handler
                                        }}
                                    />
                                    <Checkbox classNames={{ label: "text-small" }} {...register("premium")}>
                                        Mark as Premium
                                    </Checkbox>
                                </form>
                            </ModalBody>
                            <ModalFooter className="flex justify-end p-4">
                                <Button
                                    aria-label="Close Modal"
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    className="ml-2"
                                    color="primary"
                                    type="button" 
                                    onClick={handleSubmit(onSubmit)} 
                                >
                                    Create Post
                                </Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

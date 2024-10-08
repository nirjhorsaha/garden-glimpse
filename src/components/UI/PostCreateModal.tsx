/* eslint-disable prettier/prettier */
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

interface PostCreateModalProps {
    post?: {
        title: string;
        content: string;
        category: string;
        images?: string[]; // Assuming images is an array
        isPremium?: boolean;
    };
    onSubmit?: (data: FieldValues) => void; // Add a callback prop for form submission
}

export default function PostCreateModal({ post, onSubmit }: PostCreateModalProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { register, handleSubmit, reset } = useForm();

    // Open modal and reset form for editing
    const handleOpen = () => {
        if (post) {
            reset({
                title: post.title,
                content: post.content,
                category: post.category,
                images: post.images, // If applicable
                premium: post.isPremium,
            });
        }
        onOpen();
    };

    // Handle form submission
    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data); // Pass the data to the onSubmit prop
        onClose(); // Close the modal after submission
    };

    return (
        <>
            <Button
                aria-label={post ? "Edit Post" : "Create Post"}
                className="mt-2 w-full rounded-m"
                color={post? "primary": "success"}
                onPress={handleOpen}
            >
                <Plus size={16} /> {post ? "Edit Post" : "Create Post"}
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
                                {post ? "Edit Post" : "Create a Post"}
                            </ModalHeader>
                            <ModalBody className="p-4">
                                <form onSubmit={handleSubmit(handleFormSubmit)}> {/* Wrap inputs in a form */}
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
                                    <Checkbox className="text-small" {...register("premium")}>
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
                                    onClick={handleSubmit(handleFormSubmit)} 
                                >
                                    {post ? "Update Post" : "Create Post"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


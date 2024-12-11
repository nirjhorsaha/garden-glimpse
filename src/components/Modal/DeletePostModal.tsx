import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Tooltip,
} from '@nextui-org/react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useDeletePost } from '@/src/hooks/post.hooks';

import Loading from '../UI/Loading/Loading';

interface DeletePostModalProps {
    postId: string;
}

export default function DeletePostModal({ postId }: DeletePostModalProps) {
    const { mutate: deletePost, isPending, isSuccess } = useDeletePost();
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleDelete = () => {
        deletePost(postId);
        onOpenChange();
    };

    if (!isPending && isSuccess) {
        router.push('/profile/my-post')
    }

    return (
        <>
            {isPending && <Loading />}
            <Tooltip color='danger' content='Delete Post'>
                <Trash2 className="text-red-600 cursor-pointer" size={23} onClick={onOpen} />
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this post?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="flat" onPress={() => onOpenChange()}>
                            Cancel
                        </Button>
                        <Button color="danger" onPress={handleDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

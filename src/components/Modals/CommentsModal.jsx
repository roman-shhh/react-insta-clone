import { Button, Flex, Input, Dialog, Portal } from "@chakra-ui/react";
import { Comment } from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { handlePostComment, isCommenting } = usePostComment();
	const commentRef = useRef(null);
	const commentsContainerRef = useRef(null);

	const handleSubmitComment = async (e) => {
		// do not refresh the page, prevent it
		e.preventDefault();
		await handlePostComment(post.id, commentRef.current.value);
		commentRef.current.value = "";
	};

	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		};

		if (!isOpen) return;

		const timeoutId = setTimeout(scrollToBottom, 100);
		return () => clearTimeout(timeoutId);
	}, [isOpen, post.comments.length]);

	return (
        <Dialog.Root open={isOpen} motionPreset='slideInLeft' onOpenChange={e => {
            if (!e.open) {
                onClose();
            }
        }}>
            <Portal>

                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                        <Dialog.Header>Comments</Dialog.Header>
                        <Dialog.CloseTrigger />
                        <Dialog.Body pb={6}>
                            <Flex
                                mb={4}
                                gap={4}
                                flexDir={"column"}
                                maxH={"250px"}
                                overflowY={"auto"}
                                ref={commentsContainerRef}
                            >
                                {post.comments.map((comment) => (
                                    <Comment key={comment.id} comment={comment} />
                                ))}
                            </Flex>
                            <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
                                <Input placeholder='Comment' size={"sm"} ref={commentRef} />
                                <Flex w={"full"} justifyContent={"flex-end"}>
                                    <Button type='submit' ml={"auto"} size={"sm"} my={4} loading={isCommenting}>
                                        Post
                                    </Button>
                                </Flex>
                            </form>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>

            </Portal>
        </Dialog.Root>
    );
};

export default CommentsModal;
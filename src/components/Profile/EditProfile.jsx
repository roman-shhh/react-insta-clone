import { Avatar, Button, Center, Flex, Heading, Input, Stack, Field, Dialog, Portal } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
	const [inputs, setInputs] = useState({
		fullName: '',
		username: '',
		bio: '',
	});
	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();

	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
        <>
            <Dialog.Root open={isOpen} onOpenChange={e => {
                if (!e.open) {
                    onClose();
                }
            }}>
                <Portal>

                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                            <Dialog.Header />
                            <Dialog.CloseTrigger />
                            <Dialog.Body>
                                {/* Container Flex */}
                                <Flex bg={"black"}>
                                    <Stack gap={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
                                        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                            Edit Profile
                                        </Heading>
                                        <Field.Root>
                                            <Stack direction={["column", "row"]} gap={6}>
                                                <Center>
                                                    <Avatar.Root size='xl' border={"2px solid white "}><Avatar.Fallback /><Avatar.Image src={selectedFile || authUser.profilePicURL} /></Avatar.Root>
                                                </Center>
                                                <Center w='full'>
                                                    <Button w='full' onClick={() => fileRef.current.click()}>
                                                        Edit Profile Picture
                                                    </Button>
                                                </Center>
                                                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                                            </Stack>
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label fontSize={"sm"}>Full Name</Field.Label>
                                            <Input
                                                placeholder={"Full Name"}
                                                size={"sm"}
                                                type={"text"}
                                                value={inputs.fullName || authUser.fullName}
                                                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                                            />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label fontSize={"sm"}>Username</Field.Label>
                                            <Input
                                                placeholder={"Username"}
                                                size={"sm"}
                                                type={"text"}
                                                value={inputs.username || authUser.username}
                                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                            />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label fontSize={"sm"}>Bio</Field.Label>
                                            <Input
                                                placeholder={"Bio"}
                                                size={"sm"}
                                                type={"text"}
                                                value={inputs.bio || authUser.bio}
                                                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                            />
                                        </Field.Root>

                                        <Stack gap={6} direction={["column", "row"]}>
                                            <Button
                                                bg={"red.400"}
                                                color={"white"}
                                                w='full'
                                                size='sm'
                                                _hover={{ bg: "red.500" }}
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                bg={"blue.400"}
                                                color={"white"}
                                                size='sm'
                                                w='full'
                                                _hover={{ bg: "blue.500" }}
                                                onClick={handleEditProfile}
                                                loading={isUpdating}
                                            >
                                                Submit
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Flex>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>

                </Portal>
            </Dialog.Root>
        </>
    );
};

export default EditProfile;

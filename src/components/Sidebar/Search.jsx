import { Box, Button, Flex, Input, useDisclosure, Field, Dialog, Portal } from "@chakra-ui/react";
import { Tooltip } from '../ui/tooltip';
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
	const { open: isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();

	const handleSearchUser = (e) => {
		e.preventDefault();
		getUserProfile(searchRef.current.value);
	};

	return (
        <>
            <Tooltip
				showArrow
				content={"Search"}
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
				positioning={{
                    placement: 'right'
                }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<SearchLogo />
					<Box display={{ base: "none", md: "block" }}>Search</Box>
				</Flex>
			</Tooltip>

            <Dialog.Root open={isOpen} motionPreset='slideInLeft' onOpenChange={e => {
                if (!e.open) {
                    onClose();
                }
            }}>
                <Portal>

                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                            <Dialog.Header>Search user</Dialog.Header>
                            <Dialog.CloseTrigger />
                            <Dialog.Body pb={6}>
                                <form onSubmit={handleSearchUser}>
                                    <Field.Root>
                                        <Field.Label>Username</Field.Label>
                                        <Input placeholder='username' ref={searchRef} />
                                    </Field.Root>

                                    <Flex w={"full"} justifyContent={"flex-end"}>
                                        <Button type='submit' ml={"auto"} size={"sm"} my={4} loading={isLoading}>
                                            Search
                                        </Button>
                                    </Flex>
                                </form>
                                {user && <SuggestedUser user={user} setUser={setUser} />}
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>

                </Portal>
            </Dialog.Root>
        </>
    );
};

export default Search;
import { Avatar, Box, Link } from "@chakra-ui/react";
import { Tooltip } from '../ui/tooltip';
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
        <Tooltip
			showArrow
			content={"Profile"}
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
			positioning={{
                placement: 'right'
            }}
		>
            <Link
                display={"flex"}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                asChild><RouterLink to={`/${authUser?.username}`}>
                    <Avatar.Root size={"sm"}><Avatar.Fallback /><Avatar.Image src={authUser?.profilePicURL || ""} /></Avatar.Root>
                    <Box display={{ base: "none", md: "block" }}>Profile</Box>
                </RouterLink></Link>
        </Tooltip>
    );
};

export default ProfileLink;
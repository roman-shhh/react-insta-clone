import { Avatar, Box, Button, Flex } from "@chakra-ui/react"
import { useLogout } from "../../hooks/useLogout"
import useAuthStore from "../../store/authStore"
import { Link } from "react-router-dom"

export const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout()
  const authUser = useAuthStore((state) => state.user)

  if (!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar size={"lg"} src={authUser.profilePicURL} />
        </Link>
        <Link to={`${authUser.username}`}>
          <Box fontSize={12} fontWeight={"bols"}>{authUser.username}</Box>
        </Link>
      </Flex>

      <Button
        size={"xs"}
        background={"transparent"}
        _hover={{ background:"transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor="pointer"
        isLoading={isLoggingOut}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Flex>
  )
}

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Tooltip } from '../ui/tooltip';
import { Link as RouterLink } from "react-router-dom"
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants"
import { BiLogOut } from "react-icons/bi"
import { useLogout } from "../../hooks/useLogout"
import { SidebarItems } from "./SidebarItems"

export const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout()

  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{base:2, md:4}}
    >
      <Flex direction={"column"} w={"full"} h={"full"} gap={10}>
        <Link pl={2} display={{base:"none", md:"block"}} cursor="pointer" asChild><RouterLink to={"/"}>
            <InstagramLogo />
          </RouterLink></Link>

        <Link
          pl={2}
          display={{base:"block", md:"none"}}
          cursor="pointer"
          borderRadius={6}
          _hover={{bg:"whiteAlpha.200"}}
          w={10}
          asChild><RouterLink to={"/"}>
            <InstagramMobileLogo />
          </RouterLink></Link>

        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>

        {/* LOGOUT */}
        <Tooltip
          showArrow
          content={"Logout"}
          ml={1}
          openDelay={500}
          display={{base:"block", md: "none"}}
          positioning={{
            placement: "right"
          }}
        >
          <Link
            display={"flex"}
            alignItems={"center"}
            gap={4}
            _hover={{bg:"whiteAlpha.400"}}
            borderRadius={6}
            p={2}
            w={{base:10, md:"full"}}
            mt={"auto"}
            justifyContent={{base:"center", md:"flex-start"}}
            asChild><RouterLink to={'/auth'} onClick={handleLogout}>
              <BiLogOut size={25} />
              <Button
                display={{base:"none", md: "block"}}
                variant={"ghost"}
                _hover={{bg:"transparent"}}
                loading={isLoggingOut}
              >Logout</Button>
            </RouterLink></Link>
        </Tooltip>
      </Flex>
    </Box>
  );
}

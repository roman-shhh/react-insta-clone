import { Box, Flex, Spinner } from "@chakra-ui/react"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/firebase"
import Navbar from "../../components/Navbar/Navbar"

export const PageLayout = ({children}) => {
  const {pathname} = useLocation()
  const [user, loading] = useAuthState(auth)
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth" && user;
  const checkingUserIsAuth = !user && loading

  if (checkingUserIsAuth) return <PageLayoutSpinner />

  return (
    <Flex flex={canRenderNavbar ? "column" : "row"}>
      {/* Sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{base:"70px",md:"240px"}}>
          <Sidebar />
        </Box>
      ) : null}

      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}

      {/* The page content on the right */}
      <Box flex={1} mx={"auto"}>
        {children}
      </Box>
    </Flex>
  )
}

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
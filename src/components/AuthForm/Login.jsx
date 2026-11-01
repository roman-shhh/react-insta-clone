import { Alert, Button, Input } from "@chakra-ui/react";
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const { loading, error, login } = useLogin()

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <Input
        placeholder="Password"
        fontSize={14}
        type="password"
        size={"sm"}
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />

      {error && (
        <Alert.Root status="error" fontSize={13} p={2} borderRadius={4}>
          <Alert.Indicator fontSize={14} />
          {error.message}
        </Alert.Root>
      )}

      <Button
        w={"full"}
        colorPalette="blue"
        loading={loading}
        size={"sm"}
        fontSize={14}
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  );
}

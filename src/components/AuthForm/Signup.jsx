import { Alert, Button, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react"
import { useSignUpWithEmailAndPassword } from "../../hooks/useSignUpWithEmailAndPassword"
import { LuEye, LuEyeOff } from 'react-icons/lu';

export const Signup = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    fullName: '',
    username: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const { loading, error, signup } = useSignUpWithEmailAndPassword()

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
        placeholder="Username"
        fontSize={14}
        type="text"
        size={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />

      <Input
        placeholder="Full Name"
        fontSize={14}
        type="text"
        size={"sm"}
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />

      <InputGroup
        endElement={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LuEye /> : <LuEyeOff />}
          </Button>
        }
      >
        <Input
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          size={"sm"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </InputGroup>

      {error && (
        <Alert.Root status="error" fontSize={13} p={2} borderRadius={4}>
          <Alert.Indicator fontSize={14} />
          {error.message}
        </Alert.Root>
      )}

      <Button
        w={"full"}
        colorPalette="blue"
        size={"sm"}
        fontSize={14}
        loading={loading}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
}

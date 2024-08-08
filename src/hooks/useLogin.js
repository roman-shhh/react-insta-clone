import { doc, getDoc } from "firebase/firestore"
import { auth, firestore } from "../firebase/firebase"
import useShowToast from "./useShowToast"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useAuthStore from "../store/authStore"

export const useLogin = () => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth)

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields", "error")
      return
    }
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return { loading, error, login };
}

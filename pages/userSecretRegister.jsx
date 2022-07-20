import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "reactfire";
import { useRef } from "react";
import { toast } from "react-hot-toast";

export default function UserSecretRegister(params) {
  const auth = useAuth();

  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const photoUrl = useRef("");

  const createProfile = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
      await updateProfile(res.user, { displayName: name.current.value, photoURL: photoUrl.current.value });
      toast.success(`Create account succeed with ${res.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
    console.log(res);
  };

  return (
    <>
      <input type="text" ref={email} placeholder={"Email"} />
      <input type="text" ref={password} placeholder={"Password"} />
      <input type="text" ref={name} placeholder={"name"} />
      <input type="text" ref={photoUrl} placeholder={"photo url"} />
      <button onClick={createProfile}>Submit</button>
    </>
  );
}

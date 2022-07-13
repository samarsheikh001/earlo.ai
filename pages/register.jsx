import * as React from "react";
import { useAuth, useSigninCheck, useFirestoreDocDataOnce } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc, updateDoc, increment, setDoc, getDoc } from "firebase/firestore";

import { useRef } from "react";

const signOut = (auth) => auth.signOut().then(() => console.log("signed out"));
const signIn = async (auth) => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export default function Register(params) {
  const { status, data: signinResult } = useSigninCheck();

  return (
    <>
      <div className="h-screen flex justify-center">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <SiteLogo /> */}
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign up for your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                And{" "}
                <a
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-500"
                >
                  start learning anything you want.
                </a>
              </p>
            </div>

            <div className="mt-8">{SignInButton()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { useRouter } from "next/router";

function SignInButton() {
  const { status, data: signinResult } = useSigninCheck();
  const auth = useAuth();
  const firestore = useFirestore();

  const router = useRouter();

  const nameRef = useRef();
  const learnAboutRef = useRef();

  async function setUserData(email, name, topic) {
    const userRef = doc(firestore, "users", email);
    return setDoc(userRef, {
      email,
      name,
      topic,
    });
  }

  useEffect(() => {
    if (signinResult?.user?.displayName) {
      const ref = doc(firestore, "users", signinResult.user.email);
      getDoc(ref).then((doc) => {
        if (doc.data()?.name) {
          router.push("/dashboard");
        }
      });
      console.log(ref);
    }
  }, [signinResult]);

  if (status === "loading") {
    return <div> </div>;
  }
  const { signedIn, user } = signinResult;

  const signInWithGoogle = async () => {
    await signIn(auth);
  };
  return (
    <div>
      {!signedIn ? (
        <div>
          <div
            onClick={signInWithGoogle}
            className="flex items-center justify-center border rounded cursor-pointer"
          >
            <div>
              <span className="sr-only">Sign in with Google</span>
              <img src={"/images/google.png"} className="m-2 h-12 w-12" />
            </div>
            <p className="font-medium text-gray-700 flex-1 text-center pr-2">
              Sign in with Google
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => signOut(auth)}
            className="flex items-center justify-center border rounded cursor-pointer"
          >
            <div>
              <img src={user.photoURL} className="m-2 h-12 w-12" />
            </div>
            <p className="font-medium text-gray-700 flex-1 text-center pr-2">
              {user.displayName}
            </p>
            <div className="px-2 font-bold">Logout</div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await setUserData(
                user.email,
                nameRef.current.value,
                learnAboutRef.current.value
              );
              router.push("/dashboard");
            }}
            className="my-4 space-y-2"
          >
            <div>
              <h3 className="">What is your name?</h3>
              <input
                className="block w-full my-1 rounded"
                placeholder="Name"
                type="text"
                ref={nameRef}
              />
            </div>
            <div>
              <h3 className="">What do you want to learn about?</h3>
              <input
                className="block w-full my-1 rounded"
                placeholder="Napolean/Trigonometry."
                type="text"
                ref={learnAboutRef}
              />
            </div>
            <button
              className="bg-blue-500 py-2 px-4 block w-full text-white rounded"
              type="submit"
            >
              Start Learning
            </button>
          </form>
        </>
      )}
    </div>
  );
}

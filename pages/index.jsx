import { useAuth } from "reactfire";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = useAuth();

  const route = useRouter();
  return (
    <>
      <div className="min-h-full flex h-screen">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-16"
                src="https://uploads-ssl.webflow.com/62ba867be08029af251ae3f3/62ba88085e24a6899089f331_charleyai-p-800.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your Charley AI early access
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(emailRef.current.value);
                    console.log(passwordRef.current.value);
                    try {
                      const credentials = await signInWithEmailAndPassword(
                        auth,
                        emailRef.current.value,
                        passwordRef.current.value
                      );
                    //   updateProfile(credentials.user, {
                    //     displayName: "Shea",
                    //   });
                    route.push('/dashboard')
                    } catch (error) {
                      toast.error("Failed to login");
                    }
                  }}
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        ref={emailRef}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        minLength={6}
                        required
                        ref={passwordRef}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

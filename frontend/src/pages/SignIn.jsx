// import Lottie from "lottie-react";
// import LottieSignIn from "../../assets/lotties/SignIn.json";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";

const SignIn = () => {
  const { signIn, signInWithGoogle, setDbUser } = useContext(AuthContext);

  const [selectedRole, setSelectedRole] = useState("client");

  const location = useLocation();
  console.log("location of sign in page", location);

  // location.state means where I was supposed to reach
  // const from = location.state || "/products";
  const from = location.state?.from?.pathname || "/products";
  const navigate = useNavigate();

  // signinwithgoogle V1
  // const handleSignInWithGoogle = () => {
  //   signInWithGoogle()
  //     .then((res) => {
  //       console.log(res.user);
  //       navigate(from);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

// handleSignWithGoogle V4
const handleSignInWithGoogle = async () => {
  try {
    const res = await signInWithGoogle();
    const loggedUser = res.user;

    console.log("Selected role:", selectedRole);

    const userData = {
      firebaseUid: loggedUser.uid,
      email: loggedUser.email,
      fullName: loggedUser.displayName || "",
      avatarUrl: loggedUser.photoURL || "",
      role: selectedRole, // 🔥 THIS MUST BE CORRECT
      authProvider: "google",
      status: "online",
      lastSeen: new Date().toISOString(),
      isActive: true,
    };

    console.log("Sending userData:", userData);

    const saveRes = await fetch("http://localhost:1272/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const saveData = await saveRes.json();
    console.log("Save response:", saveData);

    const dbUserRes = await fetch(
      `http://localhost:1272/users/${loggedUser.email}`
    );
    const dbUserData = await dbUserRes.json();

    setDbUser(dbUserData);
    navigate(from, { replace: true });
  } catch (err) {
    console.error(err);
  }
};

// handleSignIN V1
  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   console.log(email, password);
  //   // sign in user
  //   signIn(email, password)
  //     .then((res) => {
  //       console.log(res.user);
  //       // navigate(from);
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       console.log(error.code);
  //       console.log(error.message);
  //     });
  // };

  // handleSIginIn v2
  const handleSignIn = (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  signIn(email, password)
    .then(async (res) => {
      const loggedUser = res.user;

      // Save/update role in DB on every sign-in
      await fetch("http://localhost:1272/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: loggedUser.uid,
          email: loggedUser.email,
          role: selectedRole,           // ← send selected role
          authProvider: "password",
          status: "online",
          lastSeen: new Date().toISOString(),
          isActive: true,
        }),
      });

      navigate(from, { replace: true });
    })
    .catch((error) => console.log(error.message));
};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <Lottie
          //   style={{ width: "200px" }}
          animationData={LottieSignIn}
        ></Lottie> */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign In!</h1>
            </div>
            <form onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Sign In</button>
                {/*  */}
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="select select-bordered w-full mt-3"
                >
                  <option value="client">Client</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                </select>

                <button
                type="button"
                  onClick={handleSignInWithGoogle}
                  className="btn mt-2 bg-white text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Sign In with Google
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

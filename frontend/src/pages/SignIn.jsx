import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router";

const SignIn = () => {
  const { signIn, signInWithGoogle, setDbUser } = useContext(AuthContext);

  const [selectedRole, setSelectedRole] = useState("client");

  const location = useLocation();
  console.log("location of sign in page", location);

  // location.state means where I was supposed to reach
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
        role: selectedRole, // 
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
        `http://localhost:1272/users/${loggedUser.email}`,
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
            role: selectedRole, // 
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
    // <div className="hero bg-base-200 min-h-screen">
    //   <div className="hero-content flex-col lg:flex-row-reverse">
    //     {/* <Lottie
    //       //   style={{ width: "200px" }}
    //       animationData={LottieSignIn}
    //     ></Lottie> */}
    //     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    //       <div className="card-body">
    //         <div className="text-center lg:text-left">
    //           <h1 className="text-5xl font-bold">Sign In!</h1>
    //         </div>
    //         <form onSubmit={handleSignIn}>
    //           <fieldset className="fieldset">
    //             <label className="label">Email</label>
    //             <input
    //               name="email"
    //               type="email"
    //               className="input"
    //               placeholder="Email"
    //             />
    //             <label className="label">Password</label>
    //             <input
    //               name="password"
    //               type="password"
    //               className="input"
    //               placeholder="Password"
    //             />
    //             <div>
    //               <a className="link link-hover">Forgot password?</a>
    //             </div>
    //             <button className="btn btn-neutral mt-4">Sign In</button>
    //             {/*  */}
    //             <select
    //               value={selectedRole}
    //               onChange={(e) => setSelectedRole(e.target.value)}
    //               className="select select-bordered w-full mt-3"
    //             >
    //               <option value="client">Client</option>
    //               <option value="manager">Manager</option>
    //               <option value="developer">Developer</option>
    //             </select>

    //             <button
    //             type="button"
    //               onClick={handleSignInWithGoogle}
    //               className="btn mt-2 bg-white text-black border-[#e5e5e5]"
    //             >
    //               <svg
    //                 aria-label="Google logo"
    //                 width="16"
    //                 height="16"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 512 512"
    //               >
    //                 <g>
    //                   <path d="m0 0H512V512H0" fill="#fff"></path>
    //                   <path
    //                     fill="#34a853"
    //                     d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
    //                   ></path>
    //                   <path
    //                     fill="#4285f4"
    //                     d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
    //                   ></path>
    //                   <path
    //                     fill="#fbbc02"
    //                     d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
    //                   ></path>
    //                   <path
    //                     fill="#ea4335"
    //                     d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
    //                   ></path>
    //                 </g>
    //               </svg>
    //               Sign In with Google
    //             </button>
    //           </fieldset>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // v2
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <div className=" max-w-md">
        {/* Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl p-8 text-white">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold mb-2">Welcome Back 👋</h1>
            <p className="text-sm text-slate-400">
              Sign in to continue shopping
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn}>
            <fieldset className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                />
              </div>

              {/* Forgot */}
              <div className="text-right">
                <a className="text-sm text-indigo-400 hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-900/30">
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-[1px] bg-slate-700"></div>
                <span className="text-xs text-slate-400">Sign In using Google</span>
                <div className="flex-1 h-[1px] bg-slate-700"></div>
              </div>

              {/* Role Select */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="select cursor-pointer select-bordered w-full bg-slate-800 border-slate-700 text-white mt-2"
              >
                <option value="client">Client</option>
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="sponsor">Sponsor</option>
              </select>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="flex items-center justify-center cursor-pointer gap-2 w-full bg-white text-black py-2.5 rounded-xl hover:shadow-md transition"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
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
  );
};

export default SignIn;

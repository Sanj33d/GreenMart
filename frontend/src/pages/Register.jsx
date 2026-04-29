// import Lottie from "lottie-react";

// import lottieRegister from "../../assets/lotties/Register.json";
import { use, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { NavLink, useNavigate } from "react-router";

const Register = () => {
  const { createUser, setDbUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;

    console.log(name, email, role, password);
    // create a user
    // createUser(email, password)
    //   .then((res) => {
    //     console.log(res.user);
    //   })
    //   .catch((error) => {
    //     console.log(error.code);
    //     console.log(error.message);
    //   });

    // create userV2
    createUser(email, password)
      .then(async (res) => {
        const userData = {
          firebaseUid: res.user.uid,
          email: res.user.email,
          // fullName: res.user.displayName || "",
          fullName: name || "",
          avatarUrl: res.user.photoURL || "",
          role,
          authProvider: "password",
          status: "offline",
          lastSeen: new Date().toISOString(),
          isActive: true,
        };

        const response = await fetch("http://localhost:1272/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        
        const data = await response.json();
        console.log("saved user in db", data);

        if (response.ok) {
          form.reset();
          setDbUser(userData);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    // <div className="hero bg-base-200 min-h-screen">
    //   <div className="hero-content flex-col lg:flex-row-reverse">
    //     {/* <Lottie
    //       style={{ width: "200px" }}
    //       animationData={lottieRegister}
    //     ></Lottie> */}
    //     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    //       <div className="card-body">
    //         <div className="text-center lg:text-left">
    //           <h1 className="text-5xl font-bold">Register Now!</h1>
    //         </div>
    //         <form onSubmit={handleRegister}>
    //           <fieldset className="fieldset">
    //             <label className="label">Name</label>
    //             <input
    //               name="name"
    //               type="text"
    //               className="input"
    //               placeholder="Your name"
    //               required
    //             />
    //             <label className="label">Email</label>
    //             <input
    //               name="email"
    //               type="email"
    //               className="input"
    //               placeholder="Email"
    //               required
    //             />
    //             {/* role */}
    //             <label className="label">Role</label>
    //             <select name="role" className="select select-bordered" required>
    //               <option value="client">Client</option>
    //               <option value="designer">Designer</option>
    //               <option value="manager">Manager</option>
    //               <option value="sponsor">Sponsor</option>
    //               <option value="developer">Developer</option>
    //             </select>
    //             <label className="label">Password</label>
    //             <input
    //               name="password"
    //               type="password"
    //               className="input"
    //               placeholder="Password"
    //               required
    //             />
    //             <div>
    //               <a className="link link-hover">Forgot password?</a>
    //             </div>
    //             {error && <p className="text-red-500">{error}</p>}
    //             <button className="btn btn-neutral mt-4">Register</button>
    //             <NavLink
    //               to="/signIn"
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
    //               Login with Google
    //             </NavLink>
    //           </fieldset>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // v2
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
  <div className="w-full max-w-md">

    {/* Card */}
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl p-8 text-white">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold mb-2">
          Create Account 🚀
        </h1>
        <p className="text-sm text-slate-400">
          Join ShopiMart and start shopping
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister}>
        <fieldset className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-slate-300 mb-1 block">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
              required
            />
          </div>

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
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-slate-300 mb-1 block">
              Role
            </label>
            <select
              name="role"
              className="select select-bordered w-full bg-slate-800 border-slate-700 text-white cursor-pointer"
              required
            >
              <option value="client">Client</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="sponsor">Sponsor</option>
              <option value="developer">Developer</option>
            </select>
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
              placeholder="Enter password"
              required
            />
          </div>

          {/* Forgot */}
          <div className="text-right">
            <a className="text-sm text-indigo-400 hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          {/* Register Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-900/30">
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-[1px] bg-slate-700"></div>
            <span className="text-xs text-slate-400">OR</span>
            <div className="flex-1 h-[1px] bg-slate-700"></div>
          </div>

          {/* Google */}
          <NavLink
            to="/signIn"
            className="flex items-center justify-center gap-2 w-full bg-white text-black py-2.5 rounded-xl hover:shadow-md transition"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </NavLink>

        </fieldset>
      </form>
    </div>
  </div>
</div>
  );
};

export default Register;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Profile = () => {
  const { user, dbUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-base-200 p-8 text-white">
      <div className="max-w-xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>

        <div className="flex items-center gap-5 mb-6">
          <img
            className="w-20 h-20 rounded-full object-cover border"
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="profile"
          />

          <div>
            <h3 className="text-xl font-semibold">
              {dbUser?.fullName || user?.displayName || "No Name"}
            </h3>
            <p className="text-gray-300">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* <p>
            <strong>Firebase UID:</strong> {user?.uid}
          </p> */}

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {dbUser?.fullName || user?.displayName || "Not provided"}
          </p>

          <p>
            <strong>Role:</strong> {dbUser?.role || "client"}
          </p>

          {/* <p>
            <strong>Auth Provider:</strong>{" "}
            {dbUser?.authProvider || user?.providerData?.[0]?.providerId}
          </p> */}

          <p>
            <strong>Status:</strong> {dbUser?.status || "online"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
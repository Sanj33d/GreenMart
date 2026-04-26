import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Profile = () => {
  const { user, dbUser, setDbUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    avatarUrl: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData({
      fullName: dbUser?.fullName || user?.displayName || "",
      avatarUrl: dbUser?.avatarUrl || user?.photoURL || "",
    });
  }, [dbUser, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`http://localhost:1272/users/${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setDbUser((prev) => ({
        ...prev,
        fullName: formData.fullName,
        avatarUrl: formData.avatarUrl,
      }));

      setMessage("Profile updated successfully!");
    } else {
      setMessage(data.error || "Failed to update profile");
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();

    setFormData((prev) => ({
      ...prev,
      avatarUrl: result.secure_url,
    }));
  };

  return (
    <div className="min-h-screen bg-base-200 p-8 text-white">
      <div className="max-w-xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>

        <div className="flex items-center gap-5 mb-6">
          <img
            className="w-20 h-20 rounded-full object-cover border"
            src={formData.avatarUrl || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="profile"
          />

          <div>
            <h3 className="text-xl font-semibold">
              {formData.fullName || "No Name"}
            </h3>
            <p className="text-gray-300">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full text-black"
              placeholder="Enter full name"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          
          <div>
            <label className="block mb-1 font-semibold">Avatar URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="input input-bordered w-full text-black"
              placeholder="Enter image URL"
            />
          </div>

          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {dbUser?.role || "client"}
            </p>
            <p>
              <strong>Status:</strong> {dbUser?.status || "online"}
            </p>
          </div>

          <button className="btn btn-primary w-full">Update Profile</button>
        </form>

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;

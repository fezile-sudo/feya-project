import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./ProfileSettings.css";

function ProfileSettings() {

const { user, updateUser } = useAuth();

const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    jobTitle: user?.job_title || "",
    bio: user?.bio || ""
});

const [saved, setSaved] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {

    setProfile({
        ...profile,
        [e.target.name]: e.target.value
    });

    setSaved(false);
    setError("");
};


const handleSubmit = async (e) => {

    e.preventDefault();

    setSaved(false);
    setError("");
    setLoading(true);

    try {

        const token = localStorage.getItem("feyaPlanToken");

        const response = await fetch(
            "http://localhost:5000/api/users/profile",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(profile)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to update profile"
            );
        }

        const updatedUser = {
            ...data,
            jobTitle: data.job_title || ""
        };

        updateUser(updatedUser);

        setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            jobTitle: data.job_title || "",
            bio: data.bio || ""
        });

        setSaved(true);

    } catch (error) {

        console.error("Error updating profile:", error);

        setError(
            error.message || "Failed to update profile"
        );

    } finally {

        setLoading(false);

    }
};


const initials = profile.name
    ? profile.name
          .split(" ")
          .map(word => word[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
    : "FP";


return (

    <div className="profile-settings">

        <h2>Profile Information</h2>

        <p className="settings-description">
            Update your personal information and profile details.
        </p>


        {error && (
            <p className="settings-error">
                {error}
            </p>
        )}


        <form onSubmit={handleSubmit}>

            <div className="profile-photo">

                <div className="avatar">
                    {initials}
                </div>

                <button type="button">
                    Change Photo
                </button>

            </div>


            <div className="form-group">

                <label>Full Name</label>

                <input type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required/>

            </div>


            <div className="form-group">

                <label>Email Address</label>

                <input type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required/>

            </div>


            <div className="form-group">

                <label>Phone Number</label>

                <input type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange} />

            </div>


            <div className="form-group">

                <label>Job Title</label>

                <input type="text"
                    name="jobTitle"
                    value={profile.jobTitle}
                    onChange={handleChange}/>

            </div>


            <div className="form-group">

                <label>Bio</label>

                <textarea name="bio" value={profile.bio} onChange={handleChange}/>

            </div>


            <button className="save-btn" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
            </button>


            {saved && (
                <p className="success-message">
                    Profile updated successfully.
                </p>
            )}

        </form>

    </div>
);


}

export default ProfileSettings;

import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import '../style/Profile.css';
import WarningModal from '../common/WarningModal';

function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isEditing, setEditing] = useState(false);
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isSaveDisabled, setSaveDisabled] = useState(true);
    const [success, setSuccess] = useState('');

    const [showWarning, setShowWarning] = useState(false);
    const [onClickCancel, setOnClickCancel] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUserProfile(profile);
                setFullName(profile.fullName);
                setMobileNumber(profile.mobileNumber);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        setShowLoader(false);
    }, []);


    const onChange = (field, value) => {

        if (field === 'fullName') {
            setFullName(value);
        } else if (field === 'mobileNumber') {
            setMobileNumber(value);
        }
    };



    // handle save button state based on changes in fullName and mobileNumber
    useEffect(() => {

        if (userProfile) {
            if (fullName === userProfile.fullName && mobileNumber === userProfile.mobileNumber) {
                setSaveDisabled(true);

            }

            else {
                setSaveDisabled(false);
            }
        }

        if (!(isEditing && fullName != userProfile.fullName && mobileNumber != userProfile.mobileNumber)) {
            setShowWarning(true);
        }


    }, [fullName, mobileNumber, userProfile]);


    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            let res = await updateUserProfile({ fullName, mobileNumber });

            setUserProfile(res);
            window.dispatchEvent(new Event('profile-updated'));
            setEditing(false);
            setSuccess(`${fullName} Profile successfully edited.`);
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    }

let handleCancel = () => {
    const hasChanges =
        fullName !== userProfile.fullName ||
        mobileNumber !== userProfile.mobileNumber;

    if (hasChanges) {
        setShowWarning(true);
        setOnClickCancel(true);
    } else {
        setEditing(false);
    }
};

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>{error}</p>;
    if (!userProfile) return <p>Profile not found.</p>;

    return (
        <div className="profile-page">
            <h2>My Profile</h2>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            {!isEditing ? (

                <>
                    <h3>{userProfile.fullName}</h3>

                    <p>Email: {userProfile.email}</p>
                    <p>Mobile: {userProfile.mobileNumber}</p>
                    <p>Account Type: {userProfile.role}</p>

                    <button onClick={() => {
                        setEditing(true);
                        setSuccess('');
                        setError('');
                    }}>
                        Edit Profile
                    </button>
                </>
            ) : (

                <form onSubmit={handleEdit}>
                    <h3>Edit Profile</h3>

                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                    />

                    <label>Mobile Number</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        maxLength={10}
                        onChange={(e) => onChange('mobileNumber', e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isSaveDisabled}

                    >Save</button>
                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                </form>
            )}

            {showWarning && onClickCancel && (
                <WarningModal
                    title="Warning!"
                    message={`You are about to exit without saving your ${userProfile.role} details. Do you want to continue?`}
                    cancelText="No"
                    confirmText="Yes"
                    onCancel={() => setShowWarning(false)}
                    onConfirm={() => {
                        setEditing(false);
                        setFullName(userProfile.fullName);
                        setMobileNumber(userProfile.mobileNumber);
                        setError('');
                        setOnClickCancel(false);
                    }}
                />
            )}

        </div>
    );
}

export default Profile;

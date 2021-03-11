
function Profile(props) {

    const {
        user,
        setCurrentProfile,
        currentProfile
    } = props;

    return (
        <div className="profile">
            <div>Profile</div>
            <div>
                <img src={user.picture.large}/>
                <div>
                    <div>Name: {user.name.first} {user.name.last}</div>
                    <div>Email: {user.email}</div>
                    <div>
                        <div>Location: </div>
                        <div>Street Name and Number: {user.location.street.number} {user.location.street.name}</div>
                        <div>City: {user.location.city}</div>
                        <div>State: {user.location.state}</div>
                        <div>Postal Code: {user.location.postcode}</div>
                        <div>Country {user.location.country}</div>
                    </div>
                    <div>Phone Number: {user.cell}</div>
                    <div>Date of Birth: {user.dob.date}</div>
                    <div className="flex-row justify-center">
                        <div onClick={() => setCurrentProfile({...currentProfile ,display: false})} className="back">Back</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
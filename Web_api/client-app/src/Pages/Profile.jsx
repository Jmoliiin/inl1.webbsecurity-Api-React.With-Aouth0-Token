import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="profile mt-5 mb-5">
      {isAuthenticated && (
        <div className="profile-card d-flex p-4 justify-content-between">
          <div className="img-container">
            <img src={user.picture}></img>
          </div>
          <div className="ms-3 me-5 text align-self-center">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.birthdate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// export default Profile
// withAuthenticationRequired är en metod som när användaren går in på en sida som kräver redirekt,laddas den, skickar användaren till login och skickas tillbaka till profilsidan:
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});

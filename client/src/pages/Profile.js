import React from 'react';
import { useParams } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
  // useParams hook retrieves the username from the URL
  // then passed to the useQuery hook
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  // user object is created to populate the JSX
  const user = data?.user || {};

  if (loading) {
    return <div>Loading... </div>;
  }
  
  // props being passed to ThoughtList component 
  // to render a list of thoughts unique to this user
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {user.username}'s profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />  
        </div>

        <div className='col-12 col-lg-3 mb-3'>
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

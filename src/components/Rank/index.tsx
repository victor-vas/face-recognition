import React from 'react';
import { IUser } from '../../containers/App';

interface RankProps {
  user: IUser | null;
}

const Rank = ({ user }: RankProps) => {
  return (
    <div>
      <div className="white f3">{`${user?.name}, você já verificou...`}</div>
      <div className="white f1">{`${user?.entries}`}</div>
    </div>
  );
};

export default Rank;

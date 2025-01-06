import React from 'react';
import { TravelPlan } from '@/app/type/scheduleDetailType';
import TravelSegment from './TravelSegment';

interface TravelDetailsProps {
  travelPlan: TravelPlan;
}

const TravelDetails: React.FC<TravelDetailsProps> = ({ travelPlan }) => {
  return (
    <div className="flex gap-4 w-2/3">
      <TravelSegment title="출발 정보" info={travelPlan.startInfo} />
      <TravelSegment title="도착 정보" info={travelPlan.arriveInfo} />
    </div>
  );
};

export default TravelDetails;

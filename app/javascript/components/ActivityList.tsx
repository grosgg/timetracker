import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ActivityType } from './Activity'

type Props = {
  activities: ActivityType[]
}

const ActivityList = ({ activities }: Props) => {
  const renderActivities = (activityArray: ActivityType[]) => {
    activityArray.sort((a: ActivityType, b: ActivityType) => (new Date(b.end) > new Date(a.end) ? 1 : -1))

    return activityArray.map((a) => (
      <div key={a.id}>
        <NavLink to={`/activities/${a.id}`}>
          {a.title}
        </NavLink>
      </div>
    ));
  }

  return (
    <section>
      <h2><Link to="/activities">Activities</Link></h2>
      <p><Link to="/activities/new">New Activity</Link></p>
      <ul>{renderActivities(activities)}</ul>
    </section>
  );
}

export default ActivityList
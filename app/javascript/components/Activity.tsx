import React from 'react'
import { Link, useParams } from 'react-router-dom'

type ActivityType = {
  id?: number
  activity_type: string
  start: Date
  end: Date
  title: string
  created_at?: string
  updated_at?: string
}

type Props = {
  activities: ActivityType[],
  onDelete: (id: string) => Promise<void>
}

const Activity = ({ activities, onDelete }: Props) => {
  const { id } = useParams()
  const activity : ActivityType|undefined = activities.find((e: ActivityType) => e.id === Number(id))
  if (activity == undefined || activity.id == undefined) return (<></>)

  return (
    <>
      <h2>{activity.title}</h2>
      <ul>
        <li>Start: {new Date(activity.start).toString()}</li>
        <li>End: {new Date(activity.end).toString()}</li>
      </ul>
      <p><Link to={`/activities/${activity.id}/edit`}>Edit</Link></p>
      <button
          className="delete button-danger"
          type="button"
          onClick={() => onDelete(activity.id)}
        >
          Delete
        </button>
    </>
  )
}

export { Activity as default, ActivityType }
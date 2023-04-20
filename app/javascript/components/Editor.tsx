import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'
import ActivityList from './ActivityList'
import Activity, { ActivityType } from './Activity'
import ActivityForm from './ActivityForm'

const Editor : React.FC = () => {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/activities')
        if (!response.ok) throw Error(response.statusText)
        const data = await response.json()
        setActivities(data)
      } catch (error) {
        setIsError(true)
        console.error(error)
      }

      setIsLoading(false)
    }

    fetchData();
  }, [])

  const getCsrfToken = (): string => {
    const el = document.querySelector('meta[name="csrf-token"]')
    if (el != undefined && el instanceof HTMLMetaElement) { return el.content } else { return '' }
  }

  const getHeaders = () => (
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': getCsrfToken()
    }
  )

  const addActivity = async (newActivity: ActivityType) => {
    try {
      const response = await window.fetch('/api/activities', {
        method: 'POST',
        body: JSON.stringify(newActivity),
        headers: getHeaders()
      })
      if (!response.ok) { throw Error(response.statusText) }

      const savedActivity = await response.json()
      const newActivities = [...activities, savedActivity]
      setActivities(newActivities)
      navigate(`/activities/${savedActivity.id}`)
    } catch(error) {
      console.error(error)
    }
  }

  const deleteActivity = async (id: string) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/activities/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });

        if (!response.ok) throw Error(response.statusText);

        navigate('/activities');
        setActivities(activities.filter(a => a.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateActivity = async (updatedActivity: ActivityType) => {
    try {
      const response = await window.fetch(
        `/api/activities/${updatedActivity.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedActivity),
          headers: getHeaders()
        }
      );
  
      if (!response.ok) throw Error(response.statusText);
  
      const newActivities = activities;
      const idx = newActivities.findIndex((event) => event.id === updatedActivity.id);
      newActivities[idx] = updatedActivity;
      setActivities(newActivities);
  
      navigate(`/activities/${updatedActivity.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isError && <p>Something went wrong. Check the console.</p>}
      {
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            <div className="one-third column activity-list">
              <ActivityList activities={activities} />
            </div>

            <div className="two-thirds column activity-item">
              <Routes>
                <Route path="new" element={<ActivityForm activities={activities} onSave={addActivity} />} />
                <Route path=":id/edit" element={<ActivityForm activities={activities} onSave={updateActivity} />} />
                <Route path=":id" element={<Activity activities={activities} onDelete={deleteActivity} />} />
              </Routes>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Editor;
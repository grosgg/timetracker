import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { ActivityType } from './Activity'

type Props = {
  activities: ActivityType[],
  onSave: (activity: ActivityType) => Promise<void>
}

const ActivityForm = ({ activities, onSave }: Props) => {
  const { id } = useParams()

  const defaults : ActivityType = {
    title: '',
    activity_type: '',
    start: new Date,
    end: new Date
  }

  const currentActivity = id? activities.find((a) => a.id === Number(id)) : {};
  const initialActivityState : ActivityType = { ...defaults, ...currentActivity }
  const [activity, setActivity] = useState(initialActivityState);

  const [formErrors, setFormErrors] = useState<ErrorsType>({})

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { target } = e
    const { name } = target
    setActivity({ ...activity, [name]: target.value })
  }

  type ErrorsType = {
    title?: string
    activity_type?: string
    start?: string
    end?: string
  }

  const validateActivity = () => {
    const errors: ErrorsType = {};

    if (activity.title === '') {
      errors.title = 'You must enter a title';
    }
    if (activity.activity_type === '') {
      errors.activity_type = 'You must enter an activity type';
    }

    return errors
  }

  const renderErrors = () => {
    if (Object.keys(formErrors).length === 0) {
      return null
    }

    return (
      <div className="errors">
        <h4>Errors:</h4>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateActivity();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      onSave(activity)
    }
  };

  useEffect(() => {
    setActivity(initialActivityState);
  }, [activities]);

  return (
    <section>
      {renderErrors()}
      <h2>New Activity</h2>
      <form className="activityForm" onSubmit={handleSubmit}>
        <div className="row">
          <div className="one-half column">
            <label htmlFor="title">
              <strong>Title:</strong>
            </label>
          </div>
          <div className="one-half column">
            <input type="text" id="title" name="title" onChange={handleInputChange} value={activity.title} />
          </div>
        </div>

        <div className="row">
          <div className="one-half column">
            <label htmlFor="activity_type">
              <strong>Type:</strong>
            </label>
          </div>
          <div className="one-half column">
            <input type="text" id="activity_type" name="activity_type" onChange={handleInputChange} value={activity.activity_type} />
          </div>
        </div>
        <div className="row">
          <div className="one-half column">
            <label htmlFor="start">
              <strong>Start:</strong>
            </label>
          </div>
          <div className="one-half column">
            <DatePicker selected={new Date(activity.start)} onChange={(date) => setActivity({...activity, start: date})} showTimeSelect dateFormat="Pp" />
          </div>
        </div>
        <div className="row">
          <div className="one-half column">
            <label htmlFor="end">
              <strong>End:</strong>
            </label>
          </div>
          <div className="one-half column">
            <DatePicker selected={new Date(activity.end)} onChange={(date) => setActivity({...activity, end: date})} showTimeSelect dateFormat="Pp" />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

ActivityForm.defaultProps = {
  activities: [],
};

export default ActivityForm;
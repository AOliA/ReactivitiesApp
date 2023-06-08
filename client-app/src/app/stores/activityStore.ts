import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import {format} from 'date-fns';

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInicial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, 'dd MMM yyyy');
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInicial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInicial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInicial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInicial(true);
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => (this.selectedActivity = activity));
        this.setActivity(activity);
        this.setLoadingInicial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInicial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInicial = (state: boolean) => {
    this.loadingInicial = state;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

// ---------------------------------------------------------------------
// Previously used code start
//   activities: Activity[] = [];
// this.activities.push(activity);
// this.activities.push(activity);
// this.activities = [...this.activities.filter((a) => a.id !== id)];
// this.activities = [...this.activities.filter((a) => a.id !== activity.id),activity];

// selectActivity = (id: string) => {
// this.selectedActivity = this.activities.find((a) => a.id === id);
//   this.selectedActivity = this.activityRegistry.get(id);
// };

// cancelSelectedActivity = () => {
//   this.selectedActivity = undefined;
// };

// openForm = (id?: string) => {
//   id ? this.selectActivity(id) : this.cancelSelectedActivity();
//   this.editMode = true;
// };

// closeForm = () => {
//   this.editMode = false;
// };
// activity.date = activity.date.split("T")[0];

// get activitiesByDate() {
//   return Array.from(this.activityRegistry.values()).sort(
//     (a, b) => Date.parse(a.date) - Date.parse(b.date)
//   );
// }

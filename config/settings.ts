import { getItem, StorageKey } from "@/lib/local-storage";

export const DEFAULT_WORKOUT_REMINDER_TIME = 30;

export interface ISettings {
  workoutReminderTime: number;
}

export async function getSettings(): Promise<ISettings> {
  const settings = await getItem<ISettings>(StorageKey.SETTINGS);
  return {
    workoutReminderTime:
      settings?.workoutReminderTime ?? DEFAULT_WORKOUT_REMINDER_TIME,
  };
}

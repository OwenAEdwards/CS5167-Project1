import { writable } from 'svelte/store';

export const entries = writable([
  {
    date: '2024-09-01',
    feelings: ['Happy', 'Content'],
    amountSpent: 50,
    productivityRating: 7,
  },
  {
    date: '2024-09-02',
    feelings: ['Anxious', 'Frustrated'],
    amountSpent: 100,
    productivityRating: 5,
  }
]);

export const selectedActivitiesStore = writable(['Feeling', 'Spending', 'Reflection', 'Image Upload', 'Productivity']); // New store for selected activities

export function addEntry(newEntry) {
  entries.update(currentEntries => {
    return [...currentEntries, newEntry];
  });
}

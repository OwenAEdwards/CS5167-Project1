<script>
  import { selectedActivitiesStore } from '../store.js'; 
  import { onDestroy } from 'svelte';

  export let availableActivities = ['Feeling', 'Spending', 'Reflection', 'Image Upload', 'Productivity'];
  export let selectedActivities; 
  export let setSelectedActivities; 
  export let selectedTheme; // Removed the default initialization
  export let resetSelectedActivities; 
  export let applyTheme;  

  const unsubscribe = selectedActivitiesStore.subscribe(value => {
    selectedActivities = value;
  });

  onDestroy(unsubscribe);

  function handleActivityChange(activity) {
    const newSelectedActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter(a => a !== activity)
      : [...selectedActivities, activity];

    setSelectedActivities(newSelectedActivities);
  }

  const themes = ['Default', 'Dark', 'Light', 'Colorful'];

  function handleThemeChange(theme) {
    applyTheme(theme.toLowerCase());  // Call the applyTheme function directly
  }
</script>

<div class="customization">
  <h2>Customize Your Experience</h2>

  <!-- Activity Selection -->
  <div class="activity-selection">
    <h3>Select Activities to Log</h3>
    <div class="checkbox-group">
      {#each availableActivities as activity}
        <label class="activity-label">
          <input 
            type="checkbox" 
            value={activity} 
            checked={selectedActivities.includes(activity)} 
            on:change={() => handleActivityChange(activity)} />
          {activity}
        </label>
      {/each}
    </div>
    <button class="reset-button" on:click={resetSelectedActivities}>Reset Activities</button>
  </div>

  <!-- Theme Selection -->
  <div class="theme-selection">
    <h3>Choose a Theme</h3>
    <div class="button-group">
      {#each themes as theme}
        <button 
          class="theme-button" 
          on:click={() => handleThemeChange(theme)} 
          class:selected={theme.toLowerCase() === selectedTheme}>
          {theme}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .customization {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
  }

  .activity-selection, .theme-selection {
    margin-bottom: 2rem;
  }

  h3 {
    color: #555;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .activity-label {
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    white-space: nowrap;
  }

  .activity-label input {
    margin-right: 0.2rem;
    accent-color: #007bff;
  }

  .reset-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #ffcc00;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .reset-button:hover {
    background-color: #ffb300;
  }

  .button-group {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .theme-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0.25rem;
  }

  .theme-button.selected {
    background-color: #0056b3;
  }

  .theme-button:hover {
    background-color: #0056b3;
  }
</style>

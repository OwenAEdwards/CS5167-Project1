<script>
  export let availableActivities = ['Feeling', 'Spending', 'Reflection', 'Image Upload', 'Productivity'];
  export let selectedActivities = [...availableActivities];
  export let setSelectedActivities;
  export let resetSelectedActivities;

  export let selectedTheme = 'default';
  export let applyTheme;
  export let resetTheme;

  const themes = ['default', 'dark', 'light', 'colorful'];

  function handleThemeChange(theme) {
    applyTheme(theme);
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
            on:change={() => setSelectedActivities(activity)} />
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
          class:selected={theme === selectedTheme}>
          {theme}
        </button>
      {/each}
    </div>
    <button class="reset-button" on:click={resetTheme}>Reset Theme</button>
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
    text-align: center; /* Centered heading */
  }

  .checkbox-group {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping */
    justify-content: center; /* Center the checkboxes */
    margin-bottom: 1rem;
  }

  .activity-label {
    display: flex;
    align-items: center; /* Align checkbox and text vertically */
    margin: 0 0.5rem; /* Horizontal margin for spacing */
    white-space: nowrap; /* Prevent text from wrapping */
  }

  .activity-label input {
    margin-right: 0.2rem; /* Closer spacing between checkbox and label text */
    accent-color: #007bff; /* Change checkbox color */
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
    display: block; /* Center button */
    margin-left: auto;
    margin-right: auto;
  }

  .reset-button:hover {
    background-color: #ffb300; /* Darken on hover */
  }

  .button-group {
    display: flex;
    justify-content: center; /* Center theme buttons */
    flex-wrap: wrap; /* Allow wrapping */
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
    margin: 0.25rem; /* Space between buttons */
  }

  .theme-button.selected {
    background-color: #0056b3; /* Darker color for selected theme */
  }

  .theme-button:hover {
    background-color: #0056b3; /* Darken on hover */
  }
</style>

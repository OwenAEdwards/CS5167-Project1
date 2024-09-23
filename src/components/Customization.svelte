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
  <div>
    <h3>Select Activities to Log</h3>
    {#each availableActivities as activity}
      <label>
        <input 
          type="checkbox" 
          value={activity} 
          checked={selectedActivities.includes(activity)} 
          on:change={() => setSelectedActivities(activity)} />
        {activity}
      </label>
    {/each}
    <button on:click={resetSelectedActivities}>Reset Activities</button>
  </div>

  <!-- Theme Selection -->
  <div>
    <h3>Choose a Theme</h3>
    {#each themes as theme}
      <button on:click={() => handleThemeChange(theme)}>
        {theme}
      </button>
    {/each}
    <button on:click={resetTheme}>Reset Theme</button>
  </div>
</div>

<style>
  .customization {
    max-width: 600px;
    margin: auto;
    padding: 1rem;
  }
</style>

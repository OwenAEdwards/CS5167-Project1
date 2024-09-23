<script>
  import Navbar from './components/Navbar.svelte';
  import DailyEntry from './components/DailyEntry.svelte';
  import PreviousEntries from './components/PreviousEntries.svelte';
  import PerformanceOverview from './components/PerformanceOverview.svelte'; 
  import Customization from './components/Customization.svelte'; 

  let currentView = 'new'; 

  let availableActivities = ['Feeling', 'Spending', 'Reflection', 'Image Upload', 'Productivity'];
  let selectedActivities = [...availableActivities];
  let selectedTheme = 'default';
  const themes = ['default', 'dark', 'light', 'colorful'];

  function setView(view) {
    currentView = view;
  }

  function setSelectedActivities(activity) {
    if (selectedActivities.includes(activity)) {
      selectedActivities = selectedActivities.filter(a => a !== activity);
    } else {
      selectedActivities = [...selectedActivities, activity];
    }
  }

  function resetSelectedActivities() {
    selectedActivities = [...availableActivities];
  }

  function applyTheme(theme) {
    selectedTheme = theme;
    document.body.className = theme;
  }

  function resetTheme() {
    selectedTheme = 'default';
    document.body.className = '';
  }
</script>

<main>
  <h1>Goal Tracking and Journaling</h1>
  <Navbar {currentView} {setView} />
  
  {#if currentView === 'new'}
    <DailyEntry />
  {:else if currentView === 'previous'}
    <PreviousEntries />
  {:else if currentView === 'overview'}
    <PerformanceOverview />
  {:else if currentView === 'customization'}
    <Customization 
      {availableActivities} 
      {selectedActivities} 
      {setSelectedActivities} 
      {resetSelectedActivities}
      {applyTheme} 
      {resetTheme} 
    />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1rem;
  }

  h1 {
    margin-bottom: 1rem;
  }
</style>

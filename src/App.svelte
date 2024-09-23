<script>
  import Navbar from './components/Navbar.svelte';
  import DailyEntry from './components/DailyEntry.svelte';
  import PreviousEntries from './components/PreviousEntries.svelte';
  import PerformanceOverview from './components/PerformanceOverview.svelte'; 
  import Customization from './components/Customization.svelte'; 
  import UserInfo from './components/UserInfo.svelte';

  let currentView = 'new'; 

  let availableActivities = ['Feeling', 'Spending', 'Reflection', 'Image Upload', 'Productivity'];
  let selectedActivities = [...availableActivities];
  let selectedTheme = 'default';

  function setView(view) {
    currentView = view;
  }

  function setSelectedActivities(newSelectedActivities) {
    selectedActivities = newSelectedActivities; // Update to accept the full array
  }

  function resetSelectedActivities() {
    selectedActivities = [...availableActivities]; // Reset to all available activities
  }

  function applyTheme(theme) {
    selectedTheme = theme;

    // Theme logic (moved from Customization.svelte)
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--background-color', '#333');
      document.documentElement.style.setProperty('--text-color', '#fff');
    } else if (theme === 'light') {
      document.documentElement.style.setProperty('--background-color', '#fff');
      document.documentElement.style.setProperty('--text-color', '#000');
    } else if (theme === 'colorful') {
      document.documentElement.style.setProperty('--background-color', '#ffcc00');
      document.documentElement.style.setProperty('--text-color', '#333');
    } else {
      // Default theme
      document.documentElement.style.setProperty('--background-color', '#f9f9f9');
      document.documentElement.style.setProperty('--text-color', '#333');
    }
  }
</script>

<main>
  <h1>Goal Tracking and Journaling</h1>
  <Navbar {setView} />
  
  {#if currentView === 'new'}
    <div class="entry-container">
      <DailyEntry activities={selectedActivities} />
      <UserInfo /> <!-- Include UserInfo beside DailyEntry -->
    </div>
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
      selectedTheme={selectedTheme}
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

  .entry-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
</style>

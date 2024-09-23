<script>
  import { onMount } from 'svelte';

  // Hard-coded user name
  let userName = "Owen";

  // Initialize the current date and time
  let currentTime = new Date(); // Ensure currentTime is a Date object

  // Usage tracking variables
  let startDate = new Date("2024-01-01"); // Initialize as a proper Date object
  let activeDays = 15; // Hard-coded number of active days

  // Function to update the time every second
  function updateTime() {
      currentTime = new Date();
  }

  // Calculate days since the user started using the interface
  $: totalDaysUsed = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Run the updateTime function when the component is mounted
  onMount(() => {
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
  });
</script>

<div class="user-info">
  <h2>User Overview</h2>
  <p><strong>Name:</strong> {userName}</p>
  <p><strong>Current Date/Time:</strong> {currentTime.toLocaleString()}</p>
  <p><strong>Days Since First Use:</strong> {totalDaysUsed} days</p>
  <p><strong>Active Days:</strong> {activeDays} days</p>
</div>

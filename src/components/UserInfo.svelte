<script>
  import { onMount } from 'svelte';

  // Hard-coded user name
  let userName = "Owen";
  let currentTime = new Date();
  let startDate = new Date("2024-01-01");
  let activeDays = 15;

  function updateTime() {
      currentTime = new Date();
  }

  $: totalDaysUsed = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

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

<style>
  .user-info {
    max-width: 600px;
    margin: auto;
    padding: 1.5rem; /* Increased padding for larger appearance */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    background-color: #ffffff; /* White background for contrast */
  }

  .user-info h2 {
    font-family: 'Roboto', sans-serif; /* Consistent font for headings */
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .user-info p {
    margin-bottom: 0.5rem;
    font-family: 'Roboto', sans-serif; /* Consistent font for paragraphs */
    color: #666; /* Slightly lighter for readability */
  }
</style>

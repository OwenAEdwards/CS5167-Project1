<script>
  import { onMount } from 'svelte';
  import { entries } from '../store.js'; // Import entries from store

  let summary = {
    totalSpent: 0,
    avgProductivity: 0,
    feelingsFrequency: {},
    daysLogged: 0,
    goalAchievement: 0,
  };

  onMount(() => {
    entries.subscribe(value => {
      if (value.length > 0) {
        summary = calculateSummary(value);
      }
    });
  });

  function calculateSummary(entryList) {
    let totalSpent = 0;
    let totalProductivity = 0;
    let feelingsFrequency = {};
    let goalCount = 0;
    let daysLogged = entryList.length;

    entryList.forEach(entry => {
      totalSpent += entry.amountSpent;
      totalProductivity += entry.productivityRating;

      entry.feelings.forEach(feeling => {
        if (feelingsFrequency[feeling]) {
          feelingsFrequency[feeling]++;
        } else {
          feelingsFrequency[feeling] = 1;
        }
      });

      // Check goal achievement (if goal-related data exists in entry)
      if (entry.goal && entry.goal.completed) {
        goalCount++;
      }
    });

    return {
      totalSpent,
      avgProductivity: totalProductivity / daysLogged,
      feelingsFrequency,
      daysLogged,
      goalAchievement: goalCount / daysLogged * 100
    };
  }
</script>

<div class="performance-overview">
  <h2>Overview of Your Performance</h2>

  <div class="summary-item">
    <h3>Total Amount Spent: </h3>
    <p>${summary.totalSpent.toFixed(2)}</p>
  </div>

  <div class="summary-item">
    <h3>Average Productivity: </h3>
    <p>{summary.avgProductivity.toFixed(1)}/10</p>
  </div>

  <div class="summary-item">
    <h3>Most Common Feelings: </h3>
    <ul class="feelings-list">
      {#each Object.entries(summary.feelingsFrequency) as [feeling, count]}
        <li>{feeling}: {count} times</li>
      {/each}
    </ul>
  </div>

  <div class="summary-item">
    <h3>Days Logged: </h3>
    <p>{summary.daysLogged} days</p>
  </div>

  <div class="summary-item">
    <h3>Goal Achievement: </h3>
    <p>{summary.goalAchievement.toFixed(1)}%</p>
  </div>
</div>

<style>
  .performance-overview {
    max-width: 600px;
    margin: auto;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }

  .summary-item {
    margin-bottom: 1.5rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #333;
  }

  h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .feelings-list {
    list-style-type: none; /* Remove bullets */
    padding-left: 0; /* Remove default padding */
  }

  .feelings-list li {
    margin-bottom: 0.3rem; /* Add spacing between list items */
    padding: 0.5rem;
    border-radius: 4px;
  }

  p {
    margin: 0; /* Reset margin for paragraphs */
    color: #555;
  }
</style>

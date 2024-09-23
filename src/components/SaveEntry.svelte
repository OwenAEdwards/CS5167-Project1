<script>
  import { addEntry } from '../store.js';  // Import the addEntry function
  export let entry;  // Receive the entry from DailyEntry.svelte

  let isSaved = false;

  function saveEntries() {
    // Add the new entry to the store
    addEntry(entry);

    isSaved = true;

    // Reset the visual feedback after a short delay
    setTimeout(() => {
      isSaved = false;
    }, 3000);
  }
</script>

<div class="save-entry">
  <button on:click={saveEntries} class="save-button">Save Today's Entry</button>
  {#if isSaved}
    <p class="success-message">Your entry has been successfully saved!</p>
  {/if}
</div>

<style>
  .save-entry {
    text-align: center;
    margin-top: 1rem;
  }
  
  .save-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .save-button:hover {
    background-color: #45a049;
  }

  .success-message {
    color: green;
    margin-top: 10px;
  }
</style>

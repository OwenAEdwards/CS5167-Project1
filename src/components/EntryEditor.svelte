<script>
  export let entry;
  export let save;
  export let cancel;

  let updatedEntry = { ...entry }; // Clone entry to edit
  let feelingsText = updatedEntry.feelings.join(', '); // Convert array to string for display

  function updateFeelings() {
    updatedEntry.feelings = feelingsText.split(',').map(f => f.trim()).filter(f => f.length > 0);
  }
</script>

<div class="entry-editor">
  <h3>Edit Entry</h3>

  <label>
    <strong>Date:</strong>
    <input type="text" bind:value={updatedEntry.date} disabled />
  </label>

  <label>
    <strong>Feelings:</strong>
    <input type="text" bind:value={feelingsText} on:input={updateFeelings} />
  </label>

  <label>
    <strong>Amount Spent ($):</strong>
    <input type="number" bind:value={updatedEntry.amountSpent} />
  </label>

  <label>
    <strong>Productivity Rating:</strong>
    <input type="range" min="1" max="10" step="1" bind:value={updatedEntry.productivityRating} />
    <span>{updatedEntry.productivityRating}/10</span>
  </label>

  <button on:click={() => save(updatedEntry)}>Save</button>
  <button on:click={cancel}>Cancel</button>
</div>

<style>
  .entry-editor {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin: 1rem 0;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import EntryEditor from './EntryEditor.svelte'; // Import the EntryEditor component
  import { entries } from '../store.js'; // Importing the entries store

  let entriesList = [];
  let selectedEntry = null;
  let editMode = false;

  // Load entries from the store when the component mounts
  onMount(() => {
    entries.subscribe(value => {
      entriesList = value;
    });
  });

  function selectEntry(entry) {
    selectedEntry = entry;
    editMode = false; // Switch to view mode
  }

  function editEntry(entry) {
    selectedEntry = entry;
    editMode = true; // Switch to edit mode
  }

  function deleteEntry(entryToDelete) {
    entries.update(currentEntries => 
      currentEntries.filter(entry => entry !== entryToDelete)
    );
    selectedEntry = null;
  }
  
  function saveEntry(updatedEntry) {
    entries.update(currentEntries => 
      currentEntries.map(entry =>
        entry.date === updatedEntry.date ? updatedEntry : entry
      )
    );
    selectedEntry = null;
    editMode = false;
  }

  function cancelEdit() {
    selectedEntry = null;
    editMode = false;
  }
</script>

<div class="entries-container">
  <h2>Previous Entries</h2>
  
  {#if !selectedEntry}
    <ul class="entries-list">
      {#each entriesList as entry}
        <li>
          <span>{entry.date}</span>
          <button on:click={() => selectEntry(entry)}>View</button>
          <button on:click={() => editEntry(entry)}>Edit</button>
          <button on:click={() => deleteEntry(entry)}>Delete</button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if selectedEntry}
    {#if editMode}
      <EntryEditor
        entry={selectedEntry}
        save={saveEntry}
        cancel={cancelEdit}
      />
    {:else}
      <div class="entry-view">
        <h3>Entry Details for {selectedEntry.date}</h3>
        <p><strong>Feelings:</strong> {selectedEntry.feelings.join(', ')}</p>
        <p><strong>Amount Spent:</strong> ${selectedEntry.amountSpent}</p>
        <p><strong>Productivity Rating:</strong> {selectedEntry.productivityRating}/10</p>
        <button on:click={() => editEntry(selectedEntry)}>Edit Entry</button>
        <button on:click={cancelEdit}>Back to List</button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .entries-container {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
  }

  .entries-list {
    list-style: none;
    padding: 0;
  }

  .entries-list li {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .entry-view {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  button {
    margin-left: 0.5rem;
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

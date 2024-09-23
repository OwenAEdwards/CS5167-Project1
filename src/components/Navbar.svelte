<script>
  export let setView;
</script>

<nav>
  <button on:click={() => setView('new')}>New Entry</button>
  <button on:click={() => setView('previous')}>Previous Entries</button>
  <button on:click={() => setView('overview')}>Performance Overview</button>
  <button on:click={() => setView('customization')}>Customization</button>
</nav>

<style>
  nav {
    text-align: center;
    margin-bottom: 1rem;
  }

  button {
    margin: 0.5rem;
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

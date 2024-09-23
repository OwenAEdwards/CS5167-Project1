<script>
    import SaveEntry from './SaveEntry.svelte'; // Import SaveEntry component

    let feelings = [
      "Happy", "Sad", "Excited", "Anxious", "Relaxed", "Angry",
      "Content", "Frustrated", "Optimistic", "Bored", "Grateful", "Lonely"
    ];
    let selectedFeelings = [];

    let amountSpent = 0;
    let shortText = "";
    let longText = "";

    let imageFile;
    let imageCaption = "";

    let productivityRating = 5;

    let currentEntry = {
      date: new Date().toISOString().split('T')[0],
      feelings: selectedFeelings,
      amountSpent,
      shortText,
      longText,
      productivityRating,
      imageFile,
      imageCaption
    };

    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        imageFile = URL.createObjectURL(file);
      }
    }

    function updateEntry() {
      currentEntry = {
        date: new Date().toISOString().split('T')[0],
        feelings: selectedFeelings,
        amountSpent,
        shortText,
        longText,
        productivityRating,
        imageFile,
        imageCaption
      };
    }
</script>

<div class="daily-entry">
    <h2>Daily Entry</h2>

    <fieldset class="feelings-fieldset">
        <legend class="feelings-label">Feelings</legend>
        <div id="feelings" class="feelings-container">
            {#each feelings as feeling}
                <label class="feeling-option">
                    <input
                        id={feeling}
                        type="checkbox"
                        value={feeling}
                        on:change={() => {
                            if (selectedFeelings.includes(feeling)) {
                                selectedFeelings = selectedFeelings.filter(f => f !== feeling);
                            } else {
                                selectedFeelings = [...selectedFeelings, feeling];
                            }
                            updateEntry();
                        }}
                    >
                    {feeling}
                </label>
            {/each}
        </div>
    </fieldset>

    <label for="amountSpent">Amount Spent</label>
    <input id="amountSpent" type="number" bind:value={amountSpent} on:input={updateEntry} />

    <label for="shortText">Short Text</label>
    <input id="shortText" type="text" bind:value={shortText} on:input={updateEntry} />

    <label for="longText">Long Text</label>
    <textarea id="longText" bind:value={longText} on:input={updateEntry}></textarea>

    <label for="imageUpload">Image Upload</label>
    <input id="imageUpload" type="file" accept="image/*" on:change={handleImageUpload} />

    {#if imageFile}
        <img src={imageFile} alt="Uploaded preview" width="200" />
    {/if}

    <label for="imageCaption">Image Caption</label>
    <input id="imageCaption" type="text" bind:value={imageCaption} on:input={updateEntry} />

    <label for="productivityRating">Productivity Rating</label>
    <input
        id="productivityRating"
        type="range"
        min="1"
        max="10"
        bind:value={productivityRating}
        on:input={updateEntry}
    />
    <p>Rating: {productivityRating}</p>

    <!-- Save button -->
    <SaveEntry entry={currentEntry} />
</div>

<style>
    .daily-entry {
        max-width: 800px; /* Increased width */
        margin: auto;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: #ffffff;
    }

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #333;
    }

    .feelings-fieldset {
        border: none; /* Remove default border */
        padding: 0; /* Remove default padding */
        margin: 1.2rem 0; /* Space out the fieldset */
    }

    .feelings-label {
        font-size: 1.3rem; /* Larger font size for the feelings label */
        font-weight: bold;
        color: #555;
        margin-top: 1.2rem;
    }

    #feelings {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping for responsiveness */
        justify-content: center; /* Center the checkboxes */
        margin: 1rem 0; /* Add some spacing */
    }

    .feeling-option {
        display: flex;
        align-items: center;
        margin: 0.5rem 1rem; /* Space out options */
    }

    input[type="text"],
    input[type="number"],
    input[type="file"],
    textarea,
    input[type="range"] {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    textarea {
        resize: vertical;
        min-height: 80px;
    }

    img {
        margin-top: 10px;
        display: block;
    }

    p {
        margin-top: 1rem;
        font-size: 1.1rem;
        color: #333;
    }

    input[type="checkbox"] {
        margin-right: 0.5rem;
    }
</style>

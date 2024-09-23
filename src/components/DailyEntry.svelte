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

    <label>Feelings</label>
    <div id="feelings">
        {#each feelings as feeling}
            <label>
                <input
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
        max-width: 600px;
        margin: auto;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
    img {
        margin-top: 10px;
        display: block;
    }
</style>

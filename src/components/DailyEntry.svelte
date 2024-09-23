<script>
    export let activities; // Accept activities as a prop

    import SaveEntry from './SaveEntry.svelte';

    let feelings = ["Happy", "Sad", "Excited", "Anxious", "Relaxed", "Angry", "Content", "Frustrated", "Optimistic", "Bored", "Grateful", "Lonely"];
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

    {#if activities.includes('Feeling')}
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
    {/if}

    {#if activities.includes('Spending')}
    <label for="amountSpent">Amount Spent</label>
    <input id="amountSpent" type="number" bind:value={amountSpent} on:input={updateEntry} />
    {/if}

    {#if activities.includes('Reflection')}
    <label for="shortText">Short Text</label>
    <input id="shortText" type="text" bind:value={shortText} on:input={updateEntry} />
    
    <label for="longText">Long Text</label>
    <textarea id="longText" bind:value={longText} on:input={updateEntry}></textarea>
    {/if}

    {#if activities.includes('Image Upload')}
    <label for="imageUpload">Image Upload</label>
    <input id="imageUpload" type="file" accept="image/*" on:change={handleImageUpload} />
    
    {#if imageFile}
        <img src={imageFile} alt="Uploaded preview" width="200" />
    {/if}

    <label for="imageCaption">Image Caption</label>
    <input id="imageCaption" type="text" bind:value={imageCaption} on:input={updateEntry} />
    {/if}

    {#if activities.includes('Productivity')}
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
    {/if}

    <!-- Save button -->
    <SaveEntry entry={currentEntry} />
</div>

<style>
    .daily-entry {
        max-width: 800px;
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
        border: none;
        padding: 0;
        margin: 1.2rem 0;
    }

    .feelings-label {
        font-size: 1.3rem;
        font-weight: bold;
        color: #555;
        margin-top: 1.2rem;
    }

    #feelings {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1rem 0;
    }

    .feeling-option {
        display: flex;
        align-items: center;
        margin: 0.5rem 1rem;
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

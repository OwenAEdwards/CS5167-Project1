<script>
    import SaveEntry from './SaveEntry.svelte'; // Import the SaveEntry component
  
    let feelings = [
      "Happy", "Sad", "Excited", "Anxious", "Relaxed", "Angry",
      "Content", "Frustrated", "Optimistic", "Bored", "Grateful", "Lonely"
    ];
    let selectedFeelings = [];
    
    let amountSpent = 0; // Amount spent today
    let shortText = "";
    let longText = "";
    
    let imageFile;
    let imageCaption = "";
    
    let productivityRating = 5; // Default value for the productivity rating
  
    // Goal settings
    let goals = {
      feelings: '',
      amountSpent: 0,
      shortText: '',
      longText: '',
      productivityRating: 5
    };
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        imageFile = URL.createObjectURL(file);
      }
    }
    
    function checkGoals() {
      let goalAchieved = true;
      if (goals.feelings && !selectedFeelings.includes(goals.feelings)) {
        goalAchieved = false;
      }
      if (goals.amountSpent > 0 && amountSpent < goals.amountSpent) {
        goalAchieved = false;
      }
      if (goals.shortText && shortText.indexOf(goals.shortText) === -1) {
        goalAchieved = false;
      }
      if (goals.longText && longText.indexOf(goals.longText) === -1) {
        goalAchieved = false;
      }
      if (goals.productivityRating > 0 && productivityRating < goals.productivityRating) {
        goalAchieved = false;
      }
      return goalAchieved;
    }
  </script>
  
  <div class="daily-entry">
    <h2>Today's Journal Entry</h2>
  
    <!-- Activity 1: Select Feelings (Checkboxes) -->
    <div>
      <h3>How are you feeling today? (Select all that apply)</h3>
      {#each feelings as feeling}
        <label>
          <input type="checkbox" value={feeling} bind:group={selectedFeelings} />
          {feeling}
        </label>
      {/each}
    </div>
  
    <!-- Activity 2: Amount Spent (Number Input) -->
    <div>
      <h3>How much did you spend today?</h3>
      <label>
        Amount Spent (in $): 
        <input type="number" bind:value={amountSpent} min="0" placeholder="Enter amount" />
      </label>
    </div>
  
    <!-- Activity 3: Short Financial Reflection -->
    <div>
      <h3>Short Financial Reflection</h3>
      <input type="text" bind:value={shortText} placeholder="Write a quick thought about your spending or budget..." />
    </div>
  
    <!-- Activity 4: Detailed Financial Journal Entry -->
    <div>
      <h3>Detailed Journal</h3>
      <textarea bind:value={longText} placeholder="Write about your financial activities or decisions..." rows="4"></textarea>
    </div>
  
    <!-- Activity 5: Image Upload with Caption -->
    <div>
      <h3>Upload an Image (e.g., receipt)</h3>
      <input type="file" accept="image/*" on:change={handleImageUpload} />
      {#if imageFile}
        <div>
          <img src={imageFile} alt={imageCaption || ""} style="max-width: 200px;" />
          <input type="text" bind:value={imageCaption} placeholder="Write a caption (e.g., about the purchase)..." />
        </div>
      {/if}
    </div>
  
    <!-- Activity 6: Productivity Rating (1-10) -->
    <div>
      <h3>Rate Your Financial Productivity (1-10)</h3>
      <input type="range" min="1" max="10" step="1" bind:value={productivityRating} />
      <span>{productivityRating}/10</span>
    </div>
  
    <!-- Goal Setting -->
    <div class="goal-setting">
      <h3>Set Goals for Today</h3>
      <div>
        <label>
          Goal for Feelings (comma-separated): 
          <input type="text" bind:value={goals.feelings} placeholder="e.g., Happy, Content" />
        </label>
      </div>
      <div>
        <label>
          Goal for Amount Spent (in $): 
          <input type="number" bind:value={goals.amountSpent} min="0" placeholder="Enter target amount" />
        </label>
      </div>
      <div>
        <label>
          Goal for Short Reflection (contains text): 
          <input type="text" bind:value={goals.shortText} placeholder="Enter text to include" />
        </label>
      </div>
      <div>
        <label>
          Goal for Detailed Reflection (contains text): 
          <input type="text" bind:value={goals.longText} placeholder="Enter text to include" />
        </label>
      </div>
      <div>
        <label>
          Goal for Productivity Rating (minimum): 
          <input type="number" bind:value={goals.productivityRating} min="1" max="10" placeholder="Enter minimum rating" />
        </label>
      </div>
    </div>
  
    <!-- Embed SaveEntry component for saving the entries -->
    <SaveEntry />
  
    <!-- Display goal achievement status -->
    {#if checkGoals()}
      <div class="goal-achieved">
        <p>Congratulations! You have achieved your goals for today.</p>
      </div>
    {/if}
  </div>
  
  <style>
    .daily-entry {
      max-width: 600px;
      margin: auto;
      padding: 1rem;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    img {
      margin-top: 10px;
      display: block;
    }
    .goal-setting {
      margin-top: 1rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    .goal-setting label {
      display: block;
      margin: 0.5rem 0;
    }
    .goal-achieved {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      border-radius: 4px;
    }
  </style>
  
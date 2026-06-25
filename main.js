// Vocabulary data and templates structured inside an object
const storyData = {
  characters: [
    "Sir Fluffington",
    "Lady Sparkles",
    "Professor Wigglebottom",
    "Captain Banana",
    "Detective Pickles",
    "Grandma Yoda",
    "Princess Waffle",
    "Count Reginald",
    "Baron Von Squeak",
    "Madam Wobble"
  ],
  places: [
    "the Secret Cheese Vault",
    "a flying trampoline",
    "the Whispering Cupboard",
    "a jelly bean volcano",
    "the Land of Lost Socks",
    "the Moon's basement",
    "a haunted taco stand",
    "the Marshmallow Forest",
    "the underwater library",
    "a disco in outer space"
  ],
  actions: [
    "tripped over a rainbow",
    "started yodeling aggressively",
    "did the macarena with a ghost",
    "accidentally launched a rocket",
    "sneezed so hard they turned blue",
    "tried to high-five a cactus",
    "swallowed a bubblegum bubble that floated them away",
    "became the supreme ruler of all pigeons",
    "got into a staring contest with a mirror"
  ],
  objects: [
    "a glowing rubber duck",
    "a giant spoon",
    "a suspicious pineapple",
    "a magic toaster",
    "a sparkly monocle",
    "a vibrating carrot",
    "an invisible trombone",
    "a self-writing diary",
    "a half-eaten taco"
  ],
  animals: [
    "a hyperactive platypus",
    "a caffeinated sloth",
    "a dancing alpaca",
    "a fancy penguin",
    "a telepathic hamster",
    "a grumpy capybara",
    "a flamboyant flamingo",
    "a very confused octopus"
  ],
  foods: [
    "extra-spicy cheese curds",
    "a glitter-infused waffle",
    "a soggy pizza slice",
    "a mustard-flavored lollipop",
    "a chocolate-covered pickle",
    "a stack of invisible pancakes",
    "some radioactive cotton candy"
  ],
  templates: [
    "It was a chilly day of <mark>[temp]</mark> outside, and <mark>[char]</mark> was feeling adventurous. They grabbed their favorite <mark>[obj]</mark> and headed straight to <mark>[place]</mark>. Along the way, they met <mark>[anim]</mark> eating <mark>[food]</mark>. Suddenly, <mark>[char]</mark> <mark>[action]</mark>! It was so shocking that it weighed <mark>[weight]</mark> on everyone's mind.",
    
    "At <mark>[place]</mark>, <mark>[char]</mark> was trying to teach <mark>[anim]</mark> how to juggle <mark>[food]</mark>. The weather was wild, reaching a whopping <mark>[temp]</mark>! Without warning, a wild <mark>[obj]</mark> appeared and <mark>[char]</mark> <mark>[action]</mark>. Rumor has it they lost <mark>[weight]</mark> of pure sweat from embarrassment!",
    
    "Legend says that <mark>[char]</mark> once traveled to <mark>[place]</mark> with nothing but <mark>[obj]</mark> and a very hungry <mark>[anim]</mark>. It was a scorching <mark>[temp]</mark> in the shade. <mark>[char]</mark> decided to feed the animal some <mark>[food]</mark>, but then <mark>[char]</mark> <mark>[action]</mark>! The local news reported that this event shook the earth by <mark>[weight]</mark>."
  ]
};

// Application state to prevent consecutive duplicate selections
let storyCounter = 0;
const lastUsed = {
  template: -1,
  character: '',
  place: '',
  action: '',
  object: '',
  animal: '',
  food: ''
};

// DOM Elements
const nameInput = document.getElementById('custom-name');
const usRadio = document.getElementById('unit-us');
const btnGenerate = document.getElementById('btn-generate');
const btnReset = document.getElementById('btn-reset');
const btnCopy = document.getElementById('btn-copy');

const storyEmpty = document.getElementById('story-empty');
const storyLoading = document.getElementById('story-loading');
const storyContent = document.getElementById('story-content');
const storyNumber = document.getElementById('story-number');
const storyTimestamp = document.getElementById('story-timestamp');
const storyText = document.getElementById('story-text');
const copyToast = document.getElementById('copy-toast');

/**
 * Utility helper to get a random index from an array, avoiding consecutive duplicates
 */
function getRandomElement(array, keyName) {
  let attempts = 0;
  let element;
  do {
    element = array[Math.floor(Math.random() * array.length)];
    attempts++;
  } while (element === lastUsed[keyName] && attempts < 10);
  
  lastUsed[keyName] = element;
  return element;
}

/**
 * Generates and displays a unique story
 */
function generateStory() {
  // Input validation & sanitization
  let heroName = nameInput.value.trim();
  heroName = heroName.replace(/<[^>]*>/g, ''); // Simple XSS sanitization
  if (heroName.length > 30) {
    heroName = heroName.slice(0, 30);
  }

  // UI state: Show loading spinner, hide output and empty screens
  storyEmpty.classList.add('hidden');
  storyContent.classList.add('hidden');
  storyLoading.classList.remove('hidden');
  btnGenerate.disabled = true;

  // 1 second artificial loading delay for extra polish
  setTimeout(() => {
    // Select Template (preventing immediate repeats)
    let templateIdx;
    let attempts = 0;
    do {
      templateIdx = Math.floor(Math.random() * storyData.templates.length);
      attempts++;
    } while (templateIdx === lastUsed.template && attempts < 10);
    lastUsed.template = templateIdx;
    const template = storyData.templates[templateIdx];

    // Select variables from vocab arrays
    const char = heroName || getRandomElement(storyData.characters, 'character');
    const place = getRandomElement(storyData.places, 'place');
    const action = getRandomElement(storyData.actions, 'action');
    const obj = getRandomElement(storyData.objects, 'object');
    const anim = getRandomElement(storyData.animals, 'animal');
    const food = getRandomElement(storyData.foods, 'food');

    // Unit conversion calculations (Base values generated in US units)
    const tempF = Math.floor(Math.random() * (110 - 32 + 1)) + 32; // 32°F to 110°F
    const weightLbs = Math.floor(Math.random() * (300 - 50 + 1)) + 50; // 50 lbs to 300 lbs

    let tempStr, weightStr;
    if (usRadio.checked) {
      tempStr = `${tempF}°F`;
      weightStr = `${weightLbs} pounds`;
    } else {
      // UK conversion: Fahrenheit to Celsius, Pounds to Stones / Kilograms
      const tempC = Math.round((tempF - 32) * 5 / 9);
      const weightStone = (weightLbs / 14).toFixed(1);
      const weightKg = Math.round(weightLbs * 0.45359237);
      tempStr = `${tempC}°C`;
      weightStr = `${weightStone} stone (${weightKg} kg)`;
    }

    // Story assembly using regex replacements to cover potential multiple replacements
    let finalStory = template
      .replace(/\[char\]/g, char)
      .replace(/\[place\]/g, place)
      .replace(/\[action\]/g, action)
      .replace(/\[obj\]/g, obj)
      .replace(/\[anim\]/g, anim)
      .replace(/\[food\]/g, food)
      .replace(/\[temp\]/g, tempStr)
      .replace(/\[weight\]/g, weightStr);

    // Update Story Stats
    storyCounter++;
    storyNumber.textContent = `Story #${storyCounter}`;

    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    const formattedTime = now.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    storyTimestamp.innerHTML = `<i data-lucide="calendar"></i> ${formattedDate} at ${formattedTime}`;

    // Render generated story text to the UI
    storyText.innerHTML = finalStory;

    // Display state shift: hide loading and show story content
    storyLoading.classList.add('hidden');
    storyContent.classList.remove('hidden');
    btnGenerate.disabled = false;

    // Render the SVG icons for the timestamp dynamically
    lucide.createIcons();
  }, 1000);
}

/**
 * Copies the current story text to the user's clipboard
 */
function copyStoryToClipboard() {
  const cleanText = storyText.textContent || storyText.innerText;
  
  navigator.clipboard.writeText(cleanText).then(() => {
    // Reveal visual Toast notification
    copyToast.classList.remove('hidden');
    
    // Toggle copy button state visually
    const btnText = btnCopy.querySelector('.btn-text');
    const btnIcon = btnCopy.querySelector('.btn-icon');
    const originalText = btnText.textContent;
    
    btnText.textContent = 'Copied!';
    if (btnIcon) {
      btnIcon.setAttribute('data-lucide', 'check');
      lucide.createIcons();
    }
    
    // Revert styling after 2 seconds
    setTimeout(() => {
      copyToast.classList.add('hidden');
      btnText.textContent = originalText;
      if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'copy');
        lucide.createIcons();
      }
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy story to clipboard: ', err);
  });
}

/**
 * Resets the application to its initial landing state
 */
function resetApp() {
  nameInput.value = '';
  usRadio.checked = true;
  storyCounter = 0;
  
  storyContent.classList.add('hidden');
  storyLoading.classList.add('hidden');
  storyEmpty.classList.remove('hidden');
  
  // Clear last used indexes and objects
  lastUsed.template = -1;
  lastUsed.character = '';
  lastUsed.place = '';
  lastUsed.action = '';
  lastUsed.object = '';
  lastUsed.animal = '';
  lastUsed.food = '';
}

// Event Listeners
btnGenerate.addEventListener('click', generateStory);
btnReset.addEventListener('click', resetApp);
btnCopy.addEventListener('click', copyStoryToClipboard);

// Enable Enter key on custom-name field to trigger story generation
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    generateStory();
  }
});

// Initialize Lucide icons on page load
lucide.createIcons();

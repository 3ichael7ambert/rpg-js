// Define the player's starting attributes
let player = {
    name: "",
    class: "",
    level: 1,
    health: 100,
    attack: 10,
    defense: 5,
    items: []
  };
  
  // Define the different classes and their attributes
  const classes = {
    warrior: {
      attack: 15,
      defense: 10,
      items: ["potion", "sword"]
    },
    wizard: {
      attack: 20,
      defense: 5,
      items: ["potion", "wand"]
    }
    // Add more classes here
  };
  
  // Define the enemies and their attributes
  const enemies = [
    {
      name: "Goblin",
      health: 30,
      attack: 5,
      defense: 2
    },
    {
      name: "Skeleton",
      health: 50,
      attack: 8,
      defense: 3
    }
    // Add more enemies here
  ];
  
  // Function to start the game
  function startGame(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const selectedClass = document.getElementById("class").value;
  
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
  
    if (selectedClass === "") {
      alert("Please select a class.");
      return;
    }
  
    player.name = name;
    player.class = selectedClass;
    player.attack = classes[selectedClass].attack;
    player.defense = classes[selectedClass].defense;
    player.items = classes[selectedClass].items;
  
    document.getElementById("start-form").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
  
    displayStatus("You have chosen the " + selectedClass + " class.");
  }
  
  // Function to handle player actions
  function handleAction(event) {
    event.preventDefault();
    const selectedAction = event.target.id;
  
    if (selectedAction === "explore") {
      explore();
    } else if (selectedAction === "check") {
      displayStatus();
    } else if (selectedAction === "quit") {
      document.getElementById("game").classList.add("hidden");
      document.getElementById("start-form").classList.remove("hidden");
      resetPlayer();
      displayStatus();
    }
  }
  
  // Function for generating a random enemy
  function generateEnemy() {
    return enemies[Math.floor(Math.random() * enemies.length)];
  }
  
  // Function for fighting an enemy
  function fight(enemy) {
    displayStatus("You encounter a " + enemy.name);
  
    const actionsContainer = document.getElementById("actions");
    actionsContainer.innerHTML = "";
  
    const attackButton = document.createElement("button");
    attackButton.textContent = "Attack";
    attackButton.addEventListener("click", function() {
      const damage = player.attack - enemy.defense;
      if (damage > 0) {
        displayStatus("You deal " + damage + " damage to the " + enemy.name);
        enemy.health -= damage;
      } else {
        displayStatus("Your attack has no effect on the " + enemy.name);
      }
  
      if (enemy.health > 0) {
        enemyAttack(enemy);
      } else {
        displayStatus("You defeated the " + enemy.name);
        player.level += 1;
        displayStatus("You are now level " + player.level);
  
        actionsContainer.innerHTML = ""; // Clear the actions container
  
        // Create buttons for Explore, Check Status, and Quit
        const exploreButton = document.createElement("button");
        exploreButton.textContent = "Explore";
        exploreButton.addEventListener("click", explore);
        actionsContainer.appendChild(exploreButton);
  
        const checkButton = document.createElement("button");
        checkButton.textContent = "Check Status";
        checkButton.addEventListener("click", displayStatus);
        actionsContainer.appendChild(checkButton);
  
        const quitButton = document.createElement("button");
        quitButton.textContent = "Quit";
        quitButton.addEventListener("click", function() {
          document.getElementById("game").classList.add("hidden");
          document.getElementById("start-form").classList.remove("hidden");
          resetPlayer();
          displayStatus();
        });
        actionsContainer.appendChild(quitButton);
      }
    });
    actionsContainer.appendChild(attackButton);
  
    const defendButton = document.createElement("button");
    defendButton.textContent = "Defend";
    defendButton.addEventListener("click", function() {
      player.defense += 2;
      displayStatus("You defend yourself against the " + enemy.name);
      enemyAttack(enemy);
    });
    actionsContainer.appendChild(defendButton);
  
    const useItemButton = document.createElement("button");
    useItemButton.textContent = "Use Item";
    useItemButton.addEventListener("click", function() {
      // Implement code for using items here
    });
    actionsContainer.appendChild(useItemButton);
  }
  
  
  // Function for enemy attack
  function enemyAttack(enemy) {
    const damage = enemy.attack - player.defense;
    if (damage > 0) {
      displayStatus("The " + enemy.name + " deals " + damage + " damage to you");
      player.health -= damage;
    } else {
      displayStatus("The " + enemy.name + " attacks you but does no damage");
    }
  
    if (player.health <= 0) {
      displayStatus("Game over");
    }
  }
  
  // Function for exploring
  function explore() {
    const enemy = generateEnemy();
    fight(enemy);
  }
  
  // Function to display player status
  function displayStatus(message) {
    const statusContainer = document.getElementById("status");
    statusContainer.innerHTML = "";
  
    const nameElement = document.createElement("p");
    nameElement.textContent = "Name: " + player.name;
    statusContainer.appendChild(nameElement);
  
    const classElement = document.createElement("p");
    classElement.textContent = "Class: " + player.class;
    statusContainer.appendChild(classElement);
  
    const levelElement = document.createElement("p");
    levelElement.textContent = "Level: " + player.level;
    statusContainer.appendChild(levelElement);
  
    const healthElement = document.createElement("p");
    healthElement.textContent = "Health: " + player.health;
    statusContainer.appendChild(healthElement);
  
    const attackElement = document.createElement("p");
    attackElement.textContent = "Attack: " + player.attack;
    statusContainer.appendChild(attackElement);
  
    const defenseElement = document.createElement("p");
    defenseElement.textContent = "Defense: " + player.defense;
    statusContainer.appendChild(defenseElement);
  
    const itemsElement = document.createElement("p");
    itemsElement.textContent = "Items: " + player.items.join(", ");
    statusContainer.appendChild(itemsElement);
  
    if (message) {
      const messageElement = document.createElement("p");
      messageElement.textContent = message;
      statusContainer.appendChild(messageElement);
    }
  }
  
  // Function to reset player data
  function resetPlayer() {
    player = {
      name: "",
      class: "",
      level: 1,
      health: 100,
      attack: 10,
      defense: 5,
      items: []
    };
  }
  
  // Event listeners
  document.getElementById("start-form").addEventListener("submit", startGame);
  document.getElementById("action-form").addEventListener("click", handleAction);
  
  // Display initial status
  displayStatus();
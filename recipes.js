/**
 * Main JavaScript for Meal Genie Recipes Page
 * Handles recipe filtering functionality
 */

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get references to all filter controls
    const proteinSelect = document.getElementById('protein');
    const vegetableSelect = document.getElementById('vegetable');
    const dietSelect = document.getElementById('diet');
    const regenerateBtn = document.getElementById('regenerate');
    const recipeGrid = document.querySelector('.recipe-grid');

    /**
     * Filters recipes based on current selections
     * Shows/hides recipe cards that match the filters
     */
    function filterRecipes() {
        // Get current filter values
        const protein = proteinSelect.value;
        const vegetable = vegetableSelect.value;
        const diet = dietSelect.value;
        
        // Get all recipe cards
        const recipeCards = document.querySelectorAll('.recipe-card');
        let visibleCount = 0; // Track how many cards are visible

        // Loop through each recipe card
        recipeCards.forEach(card => {
            // Get filter attributes from card's data attributes
            const cardProtein = card.dataset.protein;
            const cardVegetable = card.dataset.vegetable;
            const cardDiet = card.dataset.diet;

            // Determine if card should be shown based on filters
            // If a filter is empty (""), it matches all cards for that filter
            const showCard = 
                (protein === '' || cardProtein === protein) &&
                (vegetable === '' || cardVegetable === vegetable) &&
                (diet === '' || cardDiet === diet);

            // Toggle card visibility
            card.style.display = showCard ? 'block' : 'none';
            if (showCard) visibleCount++;
        });

        // Handle "no results" message
        const noResults = document.querySelector('.no-results');
        
        // If no cards match and at least one filter is active
        if (visibleCount === 0 && (protein || vegetable || diet)) {
            // Create message if it doesn't exist
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.textContent = 'No recipes match your filters. Try different combinations!';
                recipeGrid.appendChild(message);
            }
        } 
        // Remove message if it exists and isn't needed
        else if (noResults) {
            noResults.remove();
        }
    }

    // Add event listeners to all filter dropdowns
    [proteinSelect, vegetableSelect, dietSelect].forEach(select => {
        select.addEventListener('change', filterRecipes);
    });
    
    // Add click listener to regenerate button
    regenerateBtn.addEventListener('click', filterRecipes);

    // Initialize by showing all recipes
    filterRecipes();
});
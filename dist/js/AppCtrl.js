import { ItemCtrl } from "./ItemCtrl.js";
import { UICtrl } from "./UICtrl.js";
import { StorageCtrl } from "./StorageCtrl.js";

export const AppCtrl = (function (ItemCtrl, UICtrl, StorageCtrl) {
    // Load Event Listeners
    const loadEventListeners = () => {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document
            .querySelector(UISelectors.addBtn)
            .addEventListener("click", itemAddSubmit);

        // Disable submit on Enter
        document.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                return false;
            }
        });

        // Edit icon click event trough delegation
        document
            .querySelector(UISelectors.itemList)
            .addEventListener("click", itemEditClick);

        // Update Item event
        document
            .querySelector(UISelectors.updateBtn)
            .addEventListener("click", itemUpdateSubmit);

        // Delete button event
        document
            .querySelector(UISelectors.deleteBtn)
            .addEventListener("click", itemDeleteSubmit);

        // Back button event
        document
            .querySelector(UISelectors.backBtn)
            .addEventListener("click", itemBackClick);

        // Clear all items button event
        document
            .querySelector(UISelectors.clearBtn)
            .addEventListener("click", clearAllItemsClick);
    };

    // Add item submit
    const itemAddSubmit = (e) => {
        e.preventDefault();

        // Get form input from UI CTRL
        const input = UICtrl.getItemInput();

        // Validate input
        if (input.name && input.calories) {
            // Add item to datastruct
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI list
            UICtrl.addListItem(newItem);
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            // Add to storage
            StorageCtrl.storeItem(newItem);
            // Clear fields
            UICtrl.clearInput();
        } else {
            alert("Both inputs must be valid values.");
        }

        ItemCtrl.logData();
    };

    const itemBackClick = (e) => {
        e.preventDefault();
        UICtrl.clearEditState();
    };

    const itemEditClick = (e) => {
        e.preventDefault();
        // Target edit icon
        if (e.target.classList.contains("edit-item")) {
            // get li ID
            const listId = e.target.parentElement.parentElement.id;
            // break into an arr
            const listIdArr = listId.split("-");
            // Get Actual ID and convert to int
            const id = +listIdArr[1];
            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // Set item to edit state
            ItemCtrl.setCurrentItem(itemToEdit);
            // Add Item to form
            UICtrl.addItemToForm(ItemCtrl.getCurrentItem());
            UICtrl.showEditState();
        }
    };

    const itemUpdateSubmit = (e) => {
        e.preventDefault();
        // Get item input
        const input = UICtrl.getItemInput();
        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
        // Update UI with updated item
        UICtrl.updateListItem(updatedItem);
        // Update LS
        StorageCtrl.updateItemStorage(updatedItem);
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Clear fields and state
        UICtrl.clearEditState();
    };

    const itemDeleteSubmit = (e) => {
        e.preventDefault();
        const currentItem = ItemCtrl.getCurrentItem();
        // Delete from Datastruct
        ItemCtrl.deleteItem(currentItem.id);
        // Dekete from UI
        UICtrl.deleteListItem(currentItem.id);
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Delete from LS
        StorageCtrl.deleteItemFromStorage(currentItem.id);
        UICtrl.clearEditState();
    };

    const clearAllItemsClick = () => {
        // Delete from datastruct
        ItemCtrl.clearAllItems();
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Delete from UI
        UICtrl.removeItems();
        // Clear from LS
        StorageCtrl.clearItemsStorage();
    };

    // Public Metods
    return {
        init() {
            console.log("initializing App");
            // Clear Edit state / set initial state
            UICtrl.clearEditState();
            // Fetch items from DataStruct
            const items = ItemCtrl.getItems();
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            // Populate list with items
            UICtrl.populateItemList(items);
            // Load Event Listeners
            loadEventListeners();
        },
    };
})(ItemCtrl, UICtrl, StorageCtrl);

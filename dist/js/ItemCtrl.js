import { StorageCtrl } from "./StorageCtrl.js";

export const ItemCtrl = (function () {
    // Item Constructor
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }

    // Data Struct / State
    const data = {
        // items: [
        // {
        //     id: 0,
        //     name: "Steak Dinner",
        //     calories: 1200,
        // },
        // {
        //     id: 1,
        //     name: "Cookie",
        //     calories: 1200,
        // },
        // {
        //     id: 2,
        //     name: "Eggs",
        //     calories: 1200,
        // },
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0,
    };

    // Public Methods
    return {
        getItems() {
            return data.items;
        },

        addItem(name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to num
            calories = +calories;

            // Create a new item
            const newItem = new Item(ID, name, calories);

            // Add to items arr
            data.items.push(newItem);

            return newItem;
        },

        getItemById(id) {
            let found = null;
            for (let item of data.items) {
                // get entire object by matching UI id and DataStruct id.
                if (item.id === id) found = item;
            }
            return found;
        },

        updateItem(name, calories) {
            // Turn calories to num cuz its coming from form
            calories = +calories;

            let found = null;
            data.items.forEach((item) => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },

        deleteItem(id) {
            // Get ID's
            const ids = data.items.map((item) => {
                return item.id;
            });

            // get Index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },

        clearAllItems() {
            data.items.length = 0;
        },

        setCurrentItem(itemToEdit) {
            data.currentItem = itemToEdit;
        },

        getCurrentItem() {
            return data.currentItem;
        },

        getTotalCalories() {
            let total = 0;
            for (let item of data.items) {
                total += item.calories;
            }
            return (data.totalCalories = total);
        },

        logData() {
            for (let key in data.items) {
                console.log(key, data.items[key]);
            }
            console.log(data.currentItem);
        },
    };
})();

export const StorageCtrl = (function () {
    // Public methods
    return {
        storeItem(item) {
            let items;
            // Check if any items in LS
            if (localStorage.getItem(`items`) === null) {
                items = [];
                // Push new item
                items.push(item);
                // set LS
                localStorage.setItem(`items`, JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem(`items`));
                // push new item
                items.push(item);
                // reset LS
                localStorage.setItem(`items`, JSON.stringify(items));
            }
        },

        getItemsFromStorage() {
            let items;
            if (localStorage.getItem(`items`) === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem(`items`));
            }
            return items;
        },

        updateItemStorage(updatedItem) {
            let items = JSON.parse(localStorage.getItem(`items`));

            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });

            localStorage.setItem(`items`, JSON.stringify(items));
        },

        deleteItemFromStorage(id) {
            let items = JSON.parse(localStorage.getItem(`items`));

            items.forEach((item, index) => {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });

            localStorage.setItem(`items`, JSON.stringify(items));
        },

        clearItemsStorage() {
            localStorage.removeItem(`items`);
        },
    };
})();

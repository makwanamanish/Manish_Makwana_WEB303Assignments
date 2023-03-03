/*
    Assignment 05
    Manish Makwana
*/

$(document).ready(function () {
    class ContentItem {
        constructor(id, name, description, category) {
          this.id = id;
          this.name = name;
          this.description = description;
          this.category = category;
        }
      
        updateContentItem(id, name, description, category) {
          if (id === this.id) {
            if (name !== null) {
              this.name = name;
            }
            if (description !== null) {
              this.description = description;
            }
            if (category !== null) {
              this.category = category;
            }
          }
        }
      
        toString() {
          const wrapper = $("<div>", { class: "content-item-wrapper", id: `contentitem-${this.id}` });
          const nameElem = $("<h2>", { text: this.name });
          const descriptionElem = $("<p>", { text: this.description });
          const categoryElem = $("<div>", { text: this.category });
          wrapper.append(nameElem).append(descriptionElem).append(categoryElem);
          return wrapper.prop("outerHTML");
        }
      }
      
      const theme = "My Cool Theme"; 
      
      const items = [
        new ContentItem(0, "Item 1", "This is the first item", "Category 1"),
        new ContentItem(1, "Item 2", "This is the second item", "Category 2"),
        new ContentItem(2, "Item 3", "This is the third item", "Category 1"),
        new ContentItem(3, "Item 4", "This is the fourth item", "Category 2"),
        new ContentItem(4, "Item 5", "This is the fifth item", "Category 1")
      ];
      
      $(document).ready(function() {
        // Adding theme name
        $("#theme").text(theme);
        
        // Add content items
        const itemList = $("#content-item-list");
        items.forEach(function(item) {
          const itemHtml = item.toString();
          const itemWrapper = $(itemHtml);
          itemWrapper.css({
            border: "2px solid black",
            width: "80%",
            padding: "20px",
            margin: "20px auto"
          });
          itemList.append(itemWrapper);
        });
        
        // Add update buttons
        const updateBtn1 = $("<button>", { text: "Update Item 0 (successful)" });
        updateBtn1.click(function() {
          items[0].updateContentItem(0, "New Name", null, "New Category");
          const newItemHtml = items[0].toString();
          $(`#contentitem-${items[0].id}`).replaceWith(newItemHtml);
        });
        const updateBtn2 = $("<button>", { text: "Update Item 1 (unsuccessful)" });
        updateBtn2.click(function() {
          items[0].updateContentItem(1, "New Name", null, "New Category");
          const newItemHtml = items[0].toString();
          $(`#contentitem-${items[0].id}`).replaceWith(newItemHtml);
        });
        $("#update-btns").append(updateBtn1).append(updateBtn2);
      });
      

});



$(function() {
    getProducts();
    $("#products").on("click", ".delete-button", deleteProduct);
    $("#addBtn").click(addProduct);
    $("#products").on("click", ".edit-button", openEditProductModal);
    $("#closeEditModal").click(closeEditProductModal);
    $("#saveEditProduct").click(editProduct);
});

function getProducts() {
    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        success: function(response) {
            console.log(response);
            var products = $("#products");
            products.empty();

            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                products.append(`
                    <div class="product" data-id="${item.id}">
                        <h2>${item.title}</h2>
                        <h3>${item.price}</h3>
                        <button class="edit-button" data-id="${item.id}">Edit</button>
                        <button class="delete-button" data-id="${item.id}">Delete</button>
                    </div>
                `);
            }
        }
    });
}

function addProduct() {
    var title = $("#title").val();
    var price = $("#price").val();
    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "POST",
        data: { title, price },
        success: function(response) {
            console.log(response);
            $("#title").val("");
            $("#price").val("");
            getProducts();
        }
    });
}

function openEditProductModal() {
    var btn = $(this);
    var id = btn.data("id");
    $("#editProductModal").data("id", id); // Store the product ID in the modal
    $("#editTitle").val("");
    $("#editPrice").val("");
    $("#editProductModal").show();
}

function closeEditProductModal() {
    $("#editProductModal").hide();
}

function editProduct() {
    var id = $("#editProductModal").data("id");
    var title = $("#editTitle").val();
    var price = $("#editPrice").val();

    var updatedData = {
        id,
        title,
        price
    };

    $.ajax({
        url: "https://fakestoreapi.com/products/" + id,
        method: "PUT",
        data: updatedData,
        success: function(response) {
            console.log(response);

            var productElement = $(`.product[data-id="${id}"]`);
            productElement.find("h2").text(title);
            productElement.find("h3").text(price);

            $("#editProductModal").hide();
        },
        error: function(xhr, status, error) {
            console.log("Error:", status, error);
        }
    });
}

function deleteProduct() {
    var btn = $(this);
    var id = btn.data("id");
    console.log(id);

    $.ajax({
        url: "https://fakestoreapi.com/products/" + id,
        method: "DELETE",
        success: function() {
            btn.closest(".product").remove();
        },
        error: function(xhr, status, error) {
            console.log("Error:", status, error);
        }
    });
}

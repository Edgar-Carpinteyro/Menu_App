class Customer {
    constructor(flavor, toppings) {
        this.flavor = flavor;
        this.toppings = toppings;
    }

    describe() {
        return `${this.flavor} ice cream has ${this.toppings}.`
    }
}

class Order {
    constructor(name) {
        this.name = name;
        this.customers = [];
    }
    addCustomer(customer) {
        if (customer instanceof Customer) {
            this.customers.push(customer);
        } else {
            throw new Error(`You can only add an instance of Customer. Argument is not a customer: ${customer}`);
        }
    }
    describe() {
        return `${this.name} has ${this.customers.length} customers.`;
    }
}

class Menu {
    constructor() {
        this.orders = [];
        this.selectedOrder = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case "1":
                    this.createOrder();
                    break;
                case "2":
                    this.viewOrder();
                    break;
                case "3":
                    this.deleteOrder();
                    break;
                case "4":
                    this.displayOrders();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert("See you later aligator!");
    }
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create new ice cream order
        2) View ice cream order
        3) Delete ice cream order
        4) Display all orders
        `)
    }

    showOrderMenuOptions(orderInfo) {
        return prompt(`
        0) Back
        1) Add new ice cream flavor
        2) Remove flavor
        ----------------------------
        ${orderInfo}
        `)
    }

    displayOrders() {
        let orderString = "";
        for (let i = 0; i < this.orders.length; i++) {
            orderString += i + ") " + this.orders[i].name + "\n";
        }
        alert(orderString);
    }

    createOrder() {
        let name = prompt("Enter customer name: ");
        this.orders.push(new Order(name));
    }

    viewOrder() {
        let index = prompt("Enter the index of the order you wish you view: ");
        if (index > -1 && index < this.orders.length) {
            this.selectedOrder = this.orders[index];
            let description = "Customer Order Name: " + this.selectedOrder.name + "\n";

            for (let i = 0; i < this.selectedOrder.customers.length; i++) {
                description += i + ") " + this.selectedOrder.customers[i].flavor + " - " + this.selectedOrder.customers[i].toppings + "\n";   //I found the error here. "name" was written instead of "flavor."
            }
            let selection = this.showOrderMenuOptions(description);
            switch (selection) {
                case "1":
                    this.createCustomer();
                    break;
                case "2":
                    this.deleteCustomer();
                    break;
            }
        }
    }

    deleteOrder() {
        let index = prompt("Enter the index of the customer order you wish delete: ");
        if (index > -1 && index < this.orders.length) {
            this.orders.splice(index, 1);
        }
    }

    createCustomer() {
        let flavor = prompt("Enter ice cream flavor: "); // ice cream flavor comes out as "undefined".
        let toppings = prompt("Enter ice cream topping: ");
        this.selectedOrder.customers.push(new Customer(flavor, toppings));
    }

    deleteCustomer() {
        let index = prompt("Enter the index of the ice cream flavor you want to delete: ");
        if (index > -1 && this.selectedOrder.customers.length) {
            this.selectedOrder.customers.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();


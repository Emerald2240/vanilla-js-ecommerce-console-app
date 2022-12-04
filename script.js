var peopleArray = [];
var goodsArray = [];
var cartArray = []
var receipt = [];

var firstName = "Michael";
var lastName = "Orji";
var email = "orjimichael4886@gmail.com";
var password = "123";

var sessionFirstName = "";
var sessionLastName = "";
var sessionEmail = "";
var sessionWallet = 0;
var loggedIn = false;



//#region General Functions, regardless of array/affiliation

function getItemId(column, value, arrayToSearch) {
    var id = arrayToSearch.findIndex(function (e) {
        return e[column] == value;
    })
    //console.log(`The unique id for user with ${column}: ${peopleArray[id][column]} is ${id}`);
    //console.log('');

    return id;
}

function deleteItem(columnForGettingId, value, arrayToDeleteFrom) {
    var id = getItemId(columnForGettingId, value, arrayToDeleteFrom);
    // console.log(id)

    //This is an inbuilt function for deleting values in objects but it doesnt quite reset the index of the array or delete the column entirely. The place is left as undefined. Thats why the rest of the code below was created.
    // delete peopleArray[id];  ----->>>>>>>>>

    newArray = [];
    if (id >= 0) {
        for (var i = 0; i < arrayToDeleteFrom.length; i++) {
            if (i != id) {
                // console.log('item shifted');
                newArray.push(arrayToDeleteFrom[i]);
            }
        }
    } else {
        console.log(`%c${columnForGettingId} not found in array`, 'color:red;');
        console.log('');
    }

    console.log(`%c${value} Deleted Successfully`, 'color:green;')
    return newArray;
}
//#endregion

//#region Persons/People Section

function createPerson(firstName, lastName, email, password) {
    var personObject =
    {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
        "wallet": 0,
        "receipts": []
    }
    if (doesUserEmailAlreadyExist(email)) {
        console.log('%cUser email already exists.', 'color:red;');
        console.log('');
        return false;
    } else {
        peopleArray.push(personObject);
        console.log(`%cUser: ${firstName} ${lastName}(${email}) created succesfully`, 'color:green; background-color:yellow; font-size:50px;');
        console.log('');
        return true;
    }
}

function addMoney(amount) {
    // var id = peopleArray['email'].indexOf(email);
    var id = getItemId('email', email, peopleArray);
    // console.log(id);
    if (id >= 0) {
        peopleArray[id]['wallet'] += amount;

        console.log('Money successfully added to your T3Commerce account, ' + peopleArray[id].first_name)
        console.log('Your new balance is ' + peopleArray[id].wallet + ' Naira')
        console.log('');
    } else {
        console.log('User not found. Couldnt fund wallet');
        console.log('');
    }
}

function doesUserEmailAlreadyExist(email) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].email == email) {
            // console.log('item shifted');
            return true;
        }
    }
    return false;
}

function editPerson(column, newValue) {
    var id = getItemId('email', email, peopleArray);
    if (id >= 0) {
        peopleArray[id][column] = newValue;
    } else {
        console.log('%cUser not found. Unable to edit User', 'color:red;');
        console.log('');
    }

}

function deletePerson() {
    var id = getItemId('email', email, peopleArray);
    // console.log(id)

    //This is an inbuilt function for deleting values in objects but it doesnt quite reset the index of the array or delete the column entirely. The place is left as undefined. Thats why the rest of the code below was created.
    // delete peopleArray[id];


    newPeopleArray = [];
    if (id >= 0) {
        for (var i = 0; i < peopleArray.length; i++) {
            if (i != id) {
                // console.log('item shifted');
                newPeopleArray.push(peopleArray[i]);
            }
        }
    } else {
        console.log('user not found. Unable to delete User');
        console.log('');
    }

    peopleArray = newPeopleArray;
    console.log('%cUser Account deleted successfully', 'color:green;')
}

function login(email, password) {
    if (doesUserEmailAlreadyExist) {
        for (var i = 0; i < peopleArray.length; i++) {
            if (peopleArray[i]['email'] == email && peopleArray[i]['password'] == password) {

                sessionFirstName = peopleArray[i]['first_name'];
                sessionLastName = peopleArray[i]['last_name'];
                sessionEmail = peopleArray[i]['email'];

                loggedIn = true;
                console.log('Successfully Logged In. Welcome ' + peopleArray[i]['first_name']);
                console.log('');
                return true;
            }
        }
        loggedIn = false;
        console.log('%cIncorrect password!', 'color:red;');
        console.log('');
        return false;
    } else {
        console.log('%cEmail doesnt exist. Register Instead', 'color:red;');
        console.log('');
        return false;
    }
}

function logOut() {
    loggedIn = false;
    var sessionFirstName = "";
    var sessionLastName = "";
    var sessionEmail = "";
}


//#region testing things

// createPerson(firstName, lastName, email + '1', password);
// createPerson(firstName, lastName, email, password);
// createPerson(firstName, lastName, email + '2', password);
// createPerson(firstName, lastName, email + '3', password);
// createPerson(firstName, lastName, email + '4', password);
// createPerson(firstName, lastName, email + '5', password);

// console.log(getItemId('email', 'orjimichael4886@gmail.com5', peopleArray));

// addMoney(1000);

// editPerson('email', 'admin@mail.com');

// deletePerson();

//#endregion

// console.log(peopleArray);

//#endregion

//#region This section is for Products/Goods

function createProduct(name, price, category) {
    var productObject =
    {
        "name": name,
        "category": category,
        "price": price,
    }
    if (doesProductAlreadyExist(name)) {
        console.log('%cProduct already exists.', 'color:red;');
        console.log('');
        return false;
    } else {
        goodsArray.push(productObject);
        // console.log(`Product: ${name} at ${price} Naira created succesfully`);
        // console.log('');
        return true;
    }
}

function doesProductAlreadyExist(name) {
    for (var i = 0; i < goodsArray.length; i++) {
        if (goodsArray[i].name == name) {
            // console.log('item shifted');
            return true;
        }
    }
    return false;
}

function loadAllGoods() {
    for (var i = 0; i < goodsArray.length; i++) {
        console.log(`ID[${i}] Name: ${goodsArray[i].name} Price: ${goodsArray[i].price}`);
    }
    console.log('');
}

function loadAllGoodsPerCategory(category) {
    var count = 0;
    for (var i = 0; i < goodsArray.length; i++) {
        if (goodsArray[i].category == category) {
            count++;
            console.log(`ID[${i}] ${goodsArray[i].name}. Price: ${goodsArray[i].price} Naira`)
        }
    }
    if (count == 0) {
        console.log(`%cNo product exists under '${category}' category`, 'color:red;')
    }
    console.log('');
}

function editProduct(name, column, newValue) {
    var id = getItemId('name', name, goodsArray);
    if (id >= 0) {
        goodsArray[id][column] = newValue;
    } else {
        console.log('%cUnable to edit product. Not found', 'color:red;');
        console.log('');
    }
}



//#region testing testing

// createProduct('Toothpaste', 1500, "hygiene");
// createProduct('20 Leaves Notebook', 20, "education");
// createProduct('Bic Pen', 50, "education");
// createProduct('Lucky Pen', 30, "hygiene");
// createProduct('Laptop', '300000', "computer");
// createProduct('Keyboard', 3000, "computer accessories");
// createProduct('Mouse', 1500, "computer accessories");
// createProduct('Kasio Calculator', 2500, "education");
// createProduct('Pepsi', 200, "beverage");

// // doesProductAlreadyExist('') ? console.log('exists') : console.log('doesnt exist');

// loadAllGoods();

// loadAllGoodsPerCategory('beverage');

// editProduct('Pepsi', 'price', 250)

// deleteItem('name', 'Pepsi', goodsArray);

//#endregion

// console.log(goodsArray);
//#endregion

//#region This section is for transactions(Cart, reciept etc)

function addToCart(productId, quantity = 1) {
    var total = 0;
    var cartItem = goodsArray[productId];
    cartItem['quantity'] = quantity;
    cartItem['product_id'] = productId;

    if (isItemAlreadyInCart(cartItem['name'])) {
        console.log('%cItem already in cart. You can increase the quantity.', 'color:red;');
        console.log('');
        return false;
    } else {
        cartArray.push(cartItem);

        for (var i = 0; i < cartArray.length; i++) {
            total += cartArray[i].price * cartArray[i].quantity;
        }

        cartArray['total'] = total;
        return true;
    }

}

function isItemAlreadyInCart(name) {
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].name == name) {
            return true;
        }
    }
    return false;
}

function recalculateGrossTotal() {
    var total = 0;

    for (var i = 0; i < cartArray.length; i++) {
        total += cartArray[i].price * cartArray[i].quantity;
    }

    cartArray['total'] = total;
}

function viewCart() {
    for (var i = 0; i < cartArray.length; i++) {
        console.log(`%cId[${cartArray[i].product_id}] Name: ${cartArray[i].name}. Price: ${cartArray[i].price}. Quantity: ${cartArray[i].quantity}. Total: ${cartArray[i].price * cartArray[i].quantity}`, 'color:green;');
    }

    recalculateGrossTotal();

    console.log('Gross Total: ' + cartArray.total);
    console.log('');
}

function addQuantity(name) {
    if (isItemAlreadyInCart(name)) {
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name == name) {
                cartArray[i].quantity += 1;
                recalculateGrossTotal();
                return true;
            }
        }
    } else {
        console.log('%cItem not in cart', 'color:red;');
        console.log('');
        return false
    }
}

function setQuantity(name, setQuantity) {
    if (isItemAlreadyInCart(name)) {
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name == name) {
                cartArray[i].quantity = setQuantity;
                recalculateGrossTotal();
                return true;
            }
        }
    } else {
        console.log('%cItem not in cart', 'color:red;');
        console.log('');
        return false;
    }
}

function reduceQuantity(name) {
    if (isItemAlreadyInCart(name)) {
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name == name) {
                cartArray[i].quantity -= 1;
                recalculateGrossTotal();
                return true;
            }
        }
    } else {
        console.log('%cItem not in cart', 'color:red;');
        console.log('');
        return false;
    }
}

function clearCart() {
    cartArray = [];
}

function checkOut() {
    if (cartArray.length > 0) {

        console.log('%cCongratulations!', 'color: green; background-color: yellow;')
        console.log('%cYou have successfully paid: ' + cartArray.total + 'Naira', 'color: green; background-color: yellow;');
        console.log('%cYour item will be delivered to you shortly', 'color: green; background-color: yellow;')
        console.log('');

        receipt = cartArray;
        userId = getItemId('email', sessionEmail, peopleArray);
        if (userId >= 0) {
            if (peopleArray[userId].wallet >= cartArray.total) {
                peopleArray[userId].wallet -= cartArray.total;
                peopleArray[userId]['receipts'].push(receipt);
            } else {
                console.log('%cInsufficient Balance. Top up your wallet.', 'color:red;');
                console.log('');
                return false;
            }

            clearCart();
            return true;
        } else {
            console.log('Invalid User');
            console.log('');
            return false;
        }

    } else {
        console.log('%cCart is empty', 'color:red;');
        console.log('');
        return false;
    }
}


// //#region testing testing testing
// addToCart(1);
// addToCart(0);
// addToCart(3);
// addToCart(1);
// //#endregion

// console.log(cartArray);

//#endregion













//#region Program Showcase

createPerson(firstName, lastName, email, password);
login('orjimichael4886@gmail.com', 123);
logOut();

createProduct('Toothpaste', 1500, "hygiene");
createProduct('20 Leaves Notebook', 20, "education");
createProduct('Bic Pen', 50, "education");
createProduct('Lucky Pen', 30, "hygiene");
createProduct('Laptop', '300000', "computer");
createProduct('Keyboard', 3000, "computer accessories");
createProduct('Mouse', 1500, "computer accessories");
createProduct('Kasio Calculator', 2500, "education");
createProduct('Pepsi', 200, "beverage");

loadAllGoods();

addToCart(1);
addToCart(0, 20);
addToCart(3);
addToCart(4);

cartArray = deleteItem('name', 'Toothpaste', cartArray);

// console.log(cartArray);
viewCart();

addMoney(400000);

checkOut();

console.log(peopleArray);


//#endregion
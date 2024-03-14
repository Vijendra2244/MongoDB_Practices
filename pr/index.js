// let arr = [
//     {
//       name: "student1",
//       subjects: [
//         { Maths: 60 },
//         { History: 30 },
//         { English: "50" },
//         { Biology: "40" },
//       ],
//       total: "",
//     },
//     {
//       name: "student2",
//       subjects: [
//         { Maths: "35" },
//         { History: "66" },
//         { English: "20" },
//         { Biology: "30" },
//       ],
//       total: "",
//     },
//   ];

//   function findTotal(arr) {
//     return arr.map((item) => {
//       let total = item.subjects.reduce((acc, curr) => {
//         let value = Object.values(curr)[0];
//         value = typeof value === 'string' ? parseFloat(value) : value;
//         return acc + value;
//       }, 0);
//       item.total = total;
//       return item;
//     });
//   }
// console.log(findTotal(arr))

// const user = {
//   name: "john",
//   password: "john@11",
//   id: "7468uwe",
//   city: "New York",
// };

// function removeKeyValuePair(user, keyToRemove) {
//   const newUser = { ...user };

//   delete newUser[keyToRemove];

//   return newUser;
// }

// console.log(removeKeyValuePair(user, "password"));
// console.log(user);


const foodDeliveryService = {
    serviceName: "TastyBites Delivery",
    location: "Foodville",
    restaurants: {
      italianCorner: {
        menu: {
          pizza: { available: 20, price: 12 },
          pasta: { available: 30, price: 10 },
          salad: { available: 15, price: 8 },
        },
        orders: [
          { id: 1, items: ["pizza", "pasta"], total: 22 },
          { id: 2, items: ["salad", "pasta"], total: 18 },
          { id: 3, items: ["pizza"], total: 12 },
        ],
      },
      burgerJoint: {
        menu: {
          burger: { available: 25, price: 8 },
          fries: { available: 40, price: 4 },
          drink: { available: 30, price: 2 },
        },
        orders: [
          { id: 1, items: ["burger", "fries"], total: 12 },
          { id: 2, items: ["drink", "burger", "fries"], total: 14 },
          { id: 3, items: ["drink"], total: 2 },
        ],
      },
    },
    restaurantNames: ["italianCorner", "burgerJoint"],
  };
  
  // Level-Problem 7-1
  function findDetails(foodDeliveryService) {
    const details = {};
    foodDeliveryService.restaurantNames.forEach(restaurantName => {
      const restaurant = foodDeliveryService.restaurants[restaurantName];
      const menu = restaurant.menu;

      Object.keys(menu).forEach(item => {
        const itemName = `${restaurantName}_${item}`;
        details[`${itemName}Available`] = menu[item].available;
        details[`${itemName}Price`] = menu[item].price;
      });
    });
  
    return details;
  }

  console.log(findDetails(foodDeliveryService))
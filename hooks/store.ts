// import { Item } from "@radix-ui/react-navigation-menu";
// import { create } from "zustand";

// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   quantity: number;
//   price: number;
// };

// type Index = {
//   id: number;
//   quantity: number;
//   totalPrice: number;
// };

// type Chart = {
//   products: Product[];
//   index: Index[];
//   finalPrice: number;
//   addToChart: (id: number, quantity: number, price: number) => void;
//   removeFromChart: (id: number) => void;
//   addQuantity: (id: string, quantity: number) => void;
//   reduceQuantity: (id: string, quantity: number) => void;
// };

// export const useCheckChart = create<Chart>((set) => ({
//   products: [
//     {
//       id: 1,
//       name: "Product 1",
//       image: "/image/profile.jpg",
//       quantity: 10,
//       price: 1000,
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       image: "/image/profile.jpg",
//       quantity: 5,
//       price: 1500,
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       image: "/image/profile.jpg",
//       quantity: 3,
//       price: 2000,
//     },
//   ],
//   index: [],
//   finalPrice: 0,

//   addToChart: (id, quantity, price) =>
//     set((state) => {
//       const existingIndex = state.index.find((item) => item.id === id);

//       if (existingIndex) {
//         const updatedIndex = state.index.map((item) =>
//           item.id === id
//             ? {
//                 ...item,
//                 quantity: item.quantity + quantity,
//                 totalPrice: item.totalPrice + quantity * price,
//               }
//             : item
//         );
//         return {
//           ...state,
//           index: updatedIndex,
//           finalPrice: state.finalPrice + quantity * price,
//         };
//       } else {
//         return {
//           ...state,
//           index: [
//             ...state.index,
//             { id, quantity, totalPrice: quantity * price },
//           ],
//           finalPrice: state.finalPrice + quantity * price,
//         };
//       }
//     }),

//   removeFromChart: (id) =>
//     set((state) => {
//       const existingIndex = state.index.find((item) => item.id === id);

//       if (!existingIndex) return state;

//       const updatedIndex = state.index.filter((item) => item.id !== id);
//       return {
//         ...state,
//         index: updatedIndex,
//         finalPrice: state.finalPrice - existingIndex.totalPrice,
//       };
//     }),

//   addQuantity: (id, quantity) =>
//     set((state) => {
//       const product = state.products.find((item) => item.id == id);
//       if (!product) return state;

//       const updatedProducts = state.products.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + quantity } : item
//       );

//       const updatedIndex = state.index.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: item.quantity + quantity,
//               totalPrice: (item.quantity + quantity) * product.price,
//             }
//           : item
//       );

//       const newTotalPrice = updatedIndex.reduce(
//         (sum, item) => sum + item.totalPrice,
//         0
//       );

//       return {
//         ...state,
//         products: updatedProducts,
//         index: updatedIndex,
//         finalPrice: newTotalPrice,
//       };
//     }),

//   reduceQuantity: (id, quantity) =>
//     set((state) => {
//       const product = state.products.find((item) => item.id === id);
//       if (!product) return state;

//       const updatedProducts = state.products.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
//           : item
//       );

//       const updatedIndex = state.index.map((item) =>
//         item.id + 1 === id
//           ? (console.log("yess"), {
//               ...item,
//               quantity: Math.max(item.quantity - 1, 0),
//               totalPrice: Math.max(item.quantity - 1, 0) * product.price,
//             })
//           : item
//       );

//       return {
//         ...state,
//         products: updatedProducts,
//         index: updatedIndex,
//       };
//     }),
// }));

import { Item } from "@radix-ui/react-navigation-menu";
import { create } from "zustand";

type Product = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

type Index = {
  id: string;
  quantity: number;
  totalPrice: number;
};

export type updateQuantity = {
  id: string;
  quantity: number;
};

type Chart = {
  products: Product[];
  index: Index[];
  finalPrice: number;
  updateQuantity: updateQuantity[];
  addToChart: (id: string, quantity: number, price: number) => void;
  removeFromChart: (id: string) => void;
  addQuantity: (id: string, quantity: number, originalQuantity: number) => void;
  reduceQuantity: (
    id: string,
    quantity: number,
    originalQuantity: number
  ) => void;
};

export const useCheckChart = create<Chart>((set) => ({
  products: [
    {
      id: "1",
      name: "Product 1",
      image: "/image/profile.jpg",
      quantity: 10,
      price: 1000,
    },
    {
      id: "2",
      name: "Product 2",
      image: "/image/profile.jpg",
      quantity: 5,
      price: 1500,
    },
    {
      id: "3",
      name: "Product 3",
      image: "/image/profile.jpg",
      quantity: 3,
      price: 2000,
    },
  ],
  index: [],
  updateQuantity: [],
  setUpdateQuantity: (data: updateQuantity[]) => 
    set((state) => ({ ...state, updateQuantity: data })),
  finalPrice: 0,

  addToChart: (id, quantity, price) =>
    set((state) => {
      const existingIndex = state.index.find((item) => item.id == id);

      if (existingIndex) {
        const updatedIndex = state.index.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: item.totalPrice + quantity * price,
              }
            : item
        );
        return {
          ...state,
          index: updatedIndex,
          finalPrice: state.finalPrice + quantity * price,
        };
      } else {
        return {
          ...state,
          index: [
            ...state.index,
            { id, quantity, totalPrice: quantity * price },
          ],
          finalPrice: state.finalPrice + quantity * price,
        };
      }
    }),

  removeFromChart: (id) =>
    set((state) => {
      const existingIndex = state.index.find((item) => item.id === id);

      if (!existingIndex) return state;

      const updatedIndex = state.index.filter((item) => item.id !== id);
      return {
        ...state,
        index: updatedIndex,
        finalPrice: state.finalPrice - existingIndex.totalPrice,
      };
    }),

  addQuantity: (id, quantity, originalQuantity) =>
    set((state) => {
      const existingIndex = state.updateQuantity.find((item) => item.id == id);
      
      if (existingIndex) {
        const updatedIndex = state.updateQuantity.map((item) =>
          item.id === id
            ? (console.log(item.quantity),{
                ...item,
                quantity:
                  item.quantity > originalQuantity
                    ? item.quantity + quantity
                    : originalQuantity + quantity,
              })
            : item
        );
        return {
          ...state,
          updateQuantity: updatedIndex,
        };
      } else {
        return {
          ...state,
          updateQuantity: [...state.updateQuantity, { id, quantity: originalQuantity + 1 }],
        };
      }
    }),

  reduceQuantity: (id, quantity, originalQuantity) =>
    set((state) => {
      const existingIndex = state.updateQuantity.find((item) => item.id == id);

      if (existingIndex) {
        const updatedIndex = state.updateQuantity.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 0 ? item.quantity - quantity : 0,
              }
            : item
        );
        return {
          ...state,
          updateQuantity: updatedIndex,
        };
      } else {
        return {
          ...state,
          updateQuantity: [
            ...state.updateQuantity,
            { id, quantity: originalQuantity },
          ],
        };
      }
    }),
}));

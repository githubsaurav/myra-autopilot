export interface FreeTimeOption {
  id: string;
  title: string;
  distanceMin: number;
  durationHrs: number;
  walking: "low" | "moderate" | "high";
  vegetarian: boolean;
  cost: number;
  availableNow: boolean;
  why: string;
}

export const freeTimeOptions: FreeTimeOption[] = [
  {
    id: "ft-1",
    title: "Heritage Walk + Vegetarian Dinner",
    distanceMin: 12,
    durationHrs: 2.5,
    walking: "low",
    vegetarian: true,
    cost: 1800,
    availableNow: true,
    why: "Fits your free time, your parents' pace, and your food preference.",
  },
  {
    id: "ft-2",
    title: "Riverside Evening Cruise",
    distanceMin: 18,
    durationHrs: 3,
    walking: "moderate",
    vegetarian: false,
    cost: 1250,
    availableNow: true,
    why: "Scenic and relaxed, though a bit more walking than usual.",
  },
  {
    id: "ft-3",
    title: "Indoor Food Experience",
    distanceMin: 10,
    durationHrs: 2,
    walking: "low",
    vegetarian: true,
    cost: 1500,
    availableNow: true,
    why: "Minimal walking and vegetarian-friendly — good for a lighter evening.",
  },
];

export interface RestaurantOption {
  id: string;
  name: string;
  walkMin: number;
  cabMin: number;
  vegetarianConfidence: "high" | "medium";
  price: string;
  open: boolean;
  rating: number;
  why: string;
}

export const restaurantOptions: RestaurantOption[] = [
  {
    id: "rest-1",
    name: "Lá Việt Vegetarian Kitchen",
    walkMin: 6,
    cabMin: 3,
    vegetarianConfidence: "high",
    price: "₹₹",
    open: true,
    rating: 4.6,
    why: "Fully vegetarian menu, minimal walking, open now.",
  },
  {
    id: "rest-2",
    name: "Song Han Riverside Grill",
    walkMin: 15,
    cabMin: 6,
    vegetarianConfidence: "medium",
    price: "₹₹₹",
    open: true,
    rating: 4.4,
    why: "Vegetarian options available, slightly more walking.",
  },
  {
    id: "rest-3",
    name: "Bếp Nhà Home Kitchen",
    walkMin: 4,
    cabMin: 2,
    vegetarianConfidence: "high",
    price: "₹",
    open: true,
    rating: 4.3,
    why: "Closest option, budget-friendly, vegetarian confident.",
  },
];


export enum Category {
    Book = 1,
    Cloth = 2,
    HomeAccessories = 3,
    Game = 4,
}

interface CategoryMap {
    [key: number]: { id: number; imagePath: string; text: string; };
}

export const myEnumMap: CategoryMap = {
    [Category.Book]: { id: 1, imagePath: "/assets/images/book.jpg", text: "Book" },
    [Category.Cloth]: { id: 2, imagePath: "/assets/images/cloth.jpg", text: "Cloth" },
    [Category.HomeAccessories]: { id: 3, imagePath: "/assets/images/household-appliances.jpg", text: "Home Appliances" },
    [Category.Game]: { id: 4, imagePath: "/assets/images/video_game.jpg", text: "Game" },

    // ... other mappings
};
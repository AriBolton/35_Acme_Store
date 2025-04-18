const {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProducts,
    createFavorite,
    fetchFavorites,
    destroyFavorite,
} = require("./db");

const seed = async () => {
    await client.connect();

    await createTables();
    console.log("tables created");

    const [Minecraft, Anime, Assassians, books, games, laptop] = await Promise.all([
        createUser("Minecraft", "abxy123"),
        createUser("Anime", "s0meP@ssw0rd"),
        createUser("Assassians", "P3@ch3s"),
        createProduct("books"),
        createProduct("games"),
        createProduct("laptop"),
    ]);

    console.log("users created");
    console.log(await fetchUsers());

    console.log("products created");
    console.log(await fetchProducts());

    const [user_product] = await Promise.all([
        createFavorite(Minecraft.id, laptop.id),
        createFavorite(Anime.id, books.id),
        createFavorite(Assassians.id, games.id),
    ]);

    console.log("user products created");
    console.log(await fetchFavorites(Anime.id));

    await destroyFavorite(user_product.id, Anime.id);

    console.log("after deleting user product");
    console.log(await fetchFavorites(Anime.id));

    await client.end();
};

seed();

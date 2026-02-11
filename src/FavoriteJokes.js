const STORAGE_KEY = "favorite_jokes";

export const FavoriteJokes = {
  save(joke) {
    const favorites = this.getAll();
    if (!this.check(joke)) {
      favorites.push(joke);
      this.writeToLocalStorage(favorites);
      return true;
    }
    return false;
  },

  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  delete(joke) {
    const favorites = this.getAll();
    const updatedFavorites = favorites.filter((j) => j !== joke);
    this.writeToLocalStorage(updatedFavorites);
  },

  check(joke) {
    const favorites = this.getAll();
    return favorites.includes(joke);
  },

  writeToLocalStorage(jokes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));
  },
};

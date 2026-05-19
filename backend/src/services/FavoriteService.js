class FavoriteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  list(userId) {
    return this.favoriteRepository.list(userId);
  }

  toggle(userId, productId) {
    return this.favoriteRepository.toggle(userId, productId);
  }
}

module.exports = FavoriteService;

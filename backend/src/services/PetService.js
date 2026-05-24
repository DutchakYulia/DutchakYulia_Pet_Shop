class PetService {
  constructor(petRepository, productRepository) {
    this.petRepository = petRepository;
    this.productRepository = productRepository;
  }

  list(userId) {
    return this.petRepository.list(userId);
  }

  create(userId, data) {
    if (!data.name || !data.species) throw new Error("Pet name and species are required");
    return this.petRepository.create(userId, data);
  }

  async recommendations(userId) {
    const pets = await this.petRepository.list(userId);
    if (!pets.length) return [];
    return this.productRepository.findAll({ animalType: pets[0].species, sort: "popular" });
  }
}

module.exports = PetService;

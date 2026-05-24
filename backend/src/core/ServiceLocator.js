class ServiceLocator {
  constructor() {
    this.singletons = new Map();
    this.factories = new Map();
    this.instances = new Map();
  }

  registerSingleton(key, instance) {
    if (!key) throw new Error("Dependency key is required");
    this.singletons.set(key, instance);
  }

  registerFactory(key, factory) {
    if (!key || typeof factory !== "function") {
      throw new Error("Dependency key and factory are required");
    }
    this.factories.set(key, factory);
  }

  get(key) {
    if (this.singletons.has(key)) return this.singletons.get(key);
    if (this.instances.has(key)) return this.instances.get(key);
    if (this.factories.has(key)) {
      const instance = this.factories.get(key)(this);
      this.instances.set(key, instance);
      return instance;
    }
    throw new Error(`Dependency '${key}' is not registered`);
  }
}

module.exports = ServiceLocator;

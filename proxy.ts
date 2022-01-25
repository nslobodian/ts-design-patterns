class ServerDiscoverer {
  private servers = {
    asia: "a-server",
    europe: "e-server",
    brazil: "b-server",
  };

  getServerUrl(name: string) {
    console.log(`Server discover processing: ${name}`);
    return this.servers[name] ?? "none";
  }
}

class ServerDiscovererProxy {
  private discover = new ServerDiscoverer();
  private cache = new Map<string, string>();

  getServerUrl(name: string) {
    if (!this.cache.has(name)) {
      const url = this.discover.getServerUrl(name);
      this.cache.set(name, url);
    }

    return this.cache.get(name);
  }
}

(() => {
  const discover = new ServerDiscovererProxy();

  console.log(discover.getServerUrl('europe'))
  console.log(discover.getServerUrl('brazil'))
  console.log(discover.getServerUrl('europe'))
  console.log(discover.getServerUrl('brazil'))
  console.log(discover.getServerUrl('asia'))
  console.log(discover.getServerUrl('asia'))

})();

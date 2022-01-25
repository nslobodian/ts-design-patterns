class FamilyMember {
  public children: FamilyMember[] = [];

  constructor(public name: string) {}

  addChild(child: FamilyMember) {
    this.children.push(child);
  }

  getChild(name: string): FamilyMember {
    return this.children.find((v) => v.name === name);
  }

  removeChild(child: FamilyMember): void {
    this.children = this.children.filter((v) => v.name !== child.name);
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}

function traverse(indent: number, node: FamilyMember) {
  console.log(Array(indent++).join("--") + node.name);

  node.children.forEach((child) => traverse(indent, child));
}

(() => {
  const tree = new FamilyMember("GrandParents");
  const mom = new FamilyMember("Mom");
  const uncle = new FamilyMember("Uncle");
  const I = new FamilyMember("I");
  const mySister = new FamilyMember("mySister");
  const cousin = new FamilyMember("cousin");
  const cousin2 = new FamilyMember("cousin2");

  tree.addChild(mom);
  tree.addChild(uncle);
  tree.removeChild(uncle); // note: removeChild
  tree.addChild(uncle);

  mom.addChild(I);
  mom.addChild(mySister);

  uncle.addChild(cousin);
  uncle.addChild(cousin2);

  traverse(1, tree);
})();

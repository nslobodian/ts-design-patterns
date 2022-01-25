class QueryBuilder {
  private selectProps = new Set<string>();
  private whereStatements = new Set<string>();

  select(propName: string): QueryBuilder {
    this.selectProps.add(propName);
    return this;
  }
  where(whereStatement: string): QueryBuilder {
    this.whereStatements.add(whereStatement);
    return this;
  }

  run(): string {
    const selects = Array.from(this.selectProps.values()).join(", ");
    const wheres = Array.from(this.whereStatements.values()).join(" and ");

    return `SELECT ${selects} WHERE ${wheres}`;
  }
}

(() => {
  const query = new QueryBuilder();

  const formattedQuery = query
    .select("a")
    .select("b")
    .where("a===2")
    .where("c==4")
    .run();

  console.log(formattedQuery);
})();

class EditorialOfficeContext {
  private state: ArticleState;

  constructor(state: ArticleState) {
    this.transitionTo(state);
  }

  public transitionTo(state: ArticleState) {
    console.log(`Context: Transition to ${(<any>state).constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  action() {
    this.state.action();
  }
}

abstract class ArticleState {
  protected context: EditorialOfficeContext;

  constructor() {}

  setContext(context: EditorialOfficeContext) {
    this.context = context;
  }

  abstract action(): void;
}

class DraftState extends ArticleState {
  action(): void {
    this.context.transitionTo(new ReviewState());
    this.context.action()
  }
}

class ReviewState extends ArticleState {
  action(): void {
    this.context.transitionTo(new PublishState());
    this.context.action()
  }
}

class PublishState extends ArticleState {
  action(): void {
    this.context.transitionTo(new PublishedState());
    this.context.action()
  }
}

class PublishedState extends ArticleState {
  action(): void {
    // Nothing
  }
}

(() => {
  const editorContext = new EditorialOfficeContext(new DraftState());
  editorContext.action();
})();

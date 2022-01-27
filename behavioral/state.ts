class EditorialOfficeContext {
  constructor(private state: ArticleState) {
    console.log(`Context: Create with ${(<any>state).constructor.name}`);
    this.state.setContext(this);
  }

  public transitionTo(state: ArticleState) {
    console.log(`Context: Transition to ${(<any>state).constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  getState(): ArticleState {
    return this.state;
  }
}

abstract class ArticleState {
  protected context: EditorialOfficeContext;

  constructor() {}

  setContext(context: EditorialOfficeContext) {
    this.context = context;
  }

  abstract review(): void;
  abstract publish(): void;
}

class DraftState extends ArticleState {
  review(): void {
    this.context.transitionTo(new ReviewState());
  }

  publish(): void {
    console.log("Cannot publish in draft stage");
  }
}

class ReviewState extends ArticleState {
  publish(): void {
    this.context.transitionTo(new PublishState());
  }

  review(): void {
    console.log("Article is under review");
  }
}

class PublishState extends ArticleState {
  publish(): void {
    console.log("Article was published");
  }

  review(): void {
    console.log("Article was reviewed");
  }
}

(() => {
  const editorContext = new EditorialOfficeContext(new DraftState());

  // Draft State
  editorContext.getState().publish();
  editorContext.getState().review();

  // Review State
  editorContext.getState().review();
  editorContext.getState().publish();

  // Publish State
  editorContext.getState().review();
  editorContext.getState().publish();
})();

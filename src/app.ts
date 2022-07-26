import { configure } from "mobx";
import { configurePersistable } from "mobx-persist-store";
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});
configurePersistable({
  debugMode: false,
});

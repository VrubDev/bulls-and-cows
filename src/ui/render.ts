export function renderApp(rootElement: HTMLElement): void {
  const appContainer = document.createElement("div");
  appContainer.id = "app";

  const title = document.createElement("h1");
  title.textContent = "Bulls and Cows";

  const gameInfo = document.createElement("p");
  gameInfo.id = "game-info";
  gameInfo.textContent = "Загрузка игры..";

  appContainer.appendChild(title);
  appContainer.appendChild(gameInfo);

  rootElement.appendChild(appContainer);
}

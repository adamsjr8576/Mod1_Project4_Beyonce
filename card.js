class Card {
  constructor(matchInfo, name) {
    this.name = name;
    this.matchInfo = matchInfo;
    this.matched = false;
  }
  match() {
      this.matched = true;
  }
}

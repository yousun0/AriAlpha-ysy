class Dashboard {
  static currentInstance = null;

  constructor(container) {
    this.container = container;
    this.initialize();
    Dashboard.currentInstance = this; // 현재 인스턴스 저장
  }

  initialize() {
  }
}
const createAudioNodeMock = {
  createNodeMock(element) {
    if (element.type === `audio`) {
      return {};
    }
    return null;
  }
};

export default createAudioNodeMock;

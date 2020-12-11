var parentNodes = document.getElementsByClassName('game');
window.onload = function () {
  var width = 300;
  var height = 600;

  var key_code = ['Space', 'ArrowUp'];

  for (var i = 0; i < parentNodes.length; i++) {
    // parentNodes.item(i).style.position
    parentNodes.item(i).appendChild(new GameContainer(width, height, parentNodes, key_code[i]).init());
  }

}
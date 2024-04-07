// 存储父级目录的历史，每一项是一个代表书签节点的数组
let parentStack = [];

function createBookmarkElements(bookmarks, parentId, parentBookmark = null) {
  const parent = document.getElementById(parentId);
  parent.innerHTML = ''; // Clear the parent container

  // 创建一个用于folder的group
  let foldersGroup = document.createElement('div');
  foldersGroup.className = 'foldersDiv';

  // 创建一个新的用于urls的group
  let urlsGroup = document.createElement('div');
  urlsGroup.className = 'urlsDiv';
  let urlsGroupUl = document.createElement('ul'); // 创建用于urls的ul
  urlsGroupUl.className = 'urlsUl';
  urlsGroup.appendChild(urlsGroupUl); // 将ul添加到urls的group

  if (parentBookmark) {
    parentStack.push(parentBookmark);
  }

  bookmarks.forEach(bookmark => {
    if (bookmark.type === 'folder') {
      // 对于folder, 创建div并添加到foldersGroup
      const div = document.createElement('div');
      div.className = 'folder';
      div.textContent = bookmark.name;
      div.id = bookmark.guid;
      div.title = bookmark.name;
      // 💼
      div.addEventListener('click', () => {
        createBookmarkElements(bookmark.children, parentId, bookmark);
      });
      foldersGroup.appendChild(div);
    }
    else if (bookmark.type === 'url') {
      // 对于url, 创建a标签并包装到li标签中
      const li = document.createElement('li');
      li.className = 'urlsLi';
      const a = document.createElement('a');
      a.href = bookmark.url;
      a.textContent = bookmark.name;
      a.title = bookmark.name+'👉'+bookmark.url;
      a.className = 'link';
      a.id = bookmark.guid;
      a.target = '_blank';
      li.appendChild(a); // 将a元素添加到li里
      urlsGroupUl.appendChild(li); // 将li元素添加到urlsGroupUl里
    }
  });

  // 如果foldersGroup有子节点，则将其添加到父级容器
  if (foldersGroup.hasChildNodes()) {
    parent.appendChild(foldersGroup);
  }
  // 如果urlsGroupUl有子节点，则将urlsGroup添加到父级容器
  if (urlsGroupUl.hasChildNodes()) {
    parent.appendChild(urlsGroup);
  }
}

function goBack(parentId) {
  // 确保有多于一个历史记录才能后退
  if (parentStack.length > 1) {
    parentStack.pop(); // 弹出当前目录
    const parentBookmark = parentStack[parentStack.length - 1];
    createBookmarkElements(parentBookmark.children, parentId, null);
  }
  else {
    // 在根目录时的处理
    console.log("已经是根目录");
  }
}

function init() {
  fetch('./data/json/Bookmarks.json').then(response => response.json()).then(data => {
    createBookmarkElements(data.roots.bookmark_bar.children, 'container', data.roots.bookmark_bar);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  document.getElementById('go-back').addEventListener('click', (event) => {
    event.preventDefault();
    goBack('container');
  });
  document.getElementById('go-root').addEventListener('click', (event) => {
    event.preventDefault();
    init();
  });
});
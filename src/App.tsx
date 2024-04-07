import React from 'react';
import BookmarkFolder from './BookmarkFolder';
import bookmarksData from './Bookmarks.json';

function App() {
  return (
    <div className="App">
      <BookmarkFolder folder={bookmarksData.roots.bookmark_bar}/>
    </div>
  );
}

export default App;
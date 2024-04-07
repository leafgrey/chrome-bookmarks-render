import React from 'react';
import {Bookmark} from './types';
import {Collapse} from 'antd';
import {Typography} from 'antd';
import {Col, Row} from 'antd';

const {Link} = Typography;
const {Panel} = Collapse;

// 为每一种层级定义颜色
const levelColors = ['#010101', '#4c5c7e', '#8885aa', '#4d474d', '#ffadad'];

interface BookmarkFolderProps {
  folder: Bookmark;
  level?: number; // level 是可选的，为了方便起见，默认是 0 层
}

const BookmarkFolder: React.FC<BookmarkFolderProps> = ({folder, level = 0}) => {
  // 获取当前层级的颜色
  const color = levelColors[level % levelColors.length];
  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Collapse bordered={false}>
          {folder.children?.map((bookmark) => {
            if (bookmark.type === 'folder') {
              return (
                // 我们为 header 创建一个渲染好的 React 元素，以应用颜色
                <Panel header={<span style={{color}}>{bookmark.name}</span>} key={bookmark.id}>
                  {/* 递归渲染时增加层级 */}
                  <BookmarkFolder folder={bookmark} level={level + 1}/>
                </Panel>
              );
            }
            else {
              // 对于 url 类型，使用 Link 来渲染
              return (
                /*<li key={bookmark.id}>*/
                  <Link href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    {bookmark.name}
                  </Link>
                /*</li>*/
              );
            }
          })}
        </Collapse>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default BookmarkFolder;
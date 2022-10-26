import Chat from '@components/Chat';
import { IDM, IChat } from '@typings/db';
import React, { useCallback, RefObject, VFC } from 'react';
import { ChatZone, Section, StickyHeader } from './styles';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  scrollRef: RefObject<Scrollbars>;
  isReachingEnd: boolean;
}

const ChatList: VFC<Props> = ({ chatSections, setSize, scrollRef, isReachingEnd }) => {
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        console.log('가장 위');
        setSize((prevSize) => prevSize + 1).then(() => {
          if (scrollRef.current) {
            // 스크롤 위치 유지
            scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
          }
        });
      }
    },
    [isReachingEnd, scrollRef, setSize],
  );
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([data, chats]) => {
          return (
            <Section>
              <StickyHeader>
                <button>{data}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;

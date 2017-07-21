import React from 'react';
import { Timeline } from 'react-twitter-widgets';

export const Twitter = () => {
  return (
    <div>
      <h3>Twitter</h3>
      <Timeline
        dataSource={{
          sourceType: 'URL',
          url: 'https://twitter.com/tyleranton/lists/favs'
        }}
        options={{ theme: 'dark', height: '400' }}
      />
    </div>
  );
};

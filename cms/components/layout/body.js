import React from 'react';
import {Item} from 'canner-helpers';
import {Card} from 'antd';

export default function Body() {
  return (
    <div style={{
      padding: '36px 6rem',
    }}>
      <Card>
        <Item />
      </Card>
    </div>
  )
}
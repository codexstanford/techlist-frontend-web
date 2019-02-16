import CannerScript from 'canner-script'

export default ({ attributes }) => (
  <page
    keyName="dashbaord"
    title="Dashboard"
    dataSource={attributes.dataSource}
  >
    <string title="Your name" keyName="name" />
  </page>
)
